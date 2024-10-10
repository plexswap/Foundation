import { Router } from 'itty-router';
import { CORS_ALLOW, handleCors, wrapCorsHeader } from '@plexswap/worker-utils';
import { missing } from 'itty-router-extras';
import { ChainId } from '@plexswap/chains';
import { bscTokens } from '@plexswap/tokens';

// CoinMarketCap API URL
const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

// Define types for CoinMarketCap API response
interface CoinMarketCapQuote {
  price: number;
}

interface CoinMarketCapSymbolData {
  quote: {
    USD: CoinMarketCapQuote;
  };
}

interface CoinMarketCapResponse {
  data: {
    [symbol: string]: CoinMarketCapSymbolData;
  };
}

// Function to map "chainId:tokenAddress" to symbols
export function mapAddressesToSymbols(addresses: string[]): string[] {
  const result: string[] = [];

  addresses.forEach((entry) => {
    const [chainIdStr, tokenAddress] = entry.split(':');
    const chainId = parseInt(chainIdStr, 10);

    // Check if the chainId matches BSC (for now, we only handle BSC)
    if (chainId === ChainId.BSC) {
      // Find the token by matching the address (case-insensitive)
      const token = Object.values(bscTokens).find(
        (token) => token.address.toLowerCase() === tokenAddress.toLowerCase(),
      );
      
      // If token is found, add the symbol to the result
      if (token) {
        result.push(token.symbol);
      }
    }
  });

  return result;
}

// Function to fetch cryptocurrency prices from CoinMarketCap API
async function fetchCryptoPrices(tokenList: string[], COINMARKETCAP_API_KEY: string): Promise<{ [key: string]: number | string }> {
  const tokenMap: { [key: string]: number | string } = {};

  // Use the mapAddressesToSymbols function to get the symbols for the provided tokens
  const symbols = mapAddressesToSymbols(tokenList);

  if (!COINMARKETCAP_API_KEY) {
    throw new Error('CoinMarketCap API key is missing');
  }

  try {
    // Make the API request to CoinMarketCap using fetch
    const response = await fetch(`${COINMARKETCAP_API_URL}?symbol=${symbols.join(',')}`, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY, // Fetch API key from environment variable
      },
    });

    // Check for response status
    if (!response.ok) {
      throw new Error(`Failed to fetch prices: ${response.statusText}`);
    }

    const data: CoinMarketCapResponse = await response.json(); // Cast the JSON response to CoinMarketCapResponse

    // Map the prices to the original chainId:tokenAddress format
    tokenList.forEach((token) => {
      const symbol = mapAddressesToSymbols([token])[0]; // Get the symbol for the token
      if (symbol && data.data[symbol]) {
        tokenMap[token] = data.data[symbol].quote.USD.price; // Access the price using the typed data object
      } else {
        tokenMap[token] = 'Price not available';
      }
    });

    return tokenMap;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return { error: 'Failed to fetch prices' };
  }
}

// Router for Cloudflare Workers
const router = Router();

// Route handler for fetching prices using URL parameters
router.get('/prices/list/:tokens', async (request: Request & { params: { tokens: string } }) => {
  const tokens = request.params.tokens.split(',');

  const prices = await fetchCryptoPrices(tokens, COINMARKETCAP_API_KEY); // Pass env with API key
  return new Response(JSON.stringify(prices), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// Cloudflare Worker event listener
router.all('*', () => missing('Not found'));

router.options('*', handleCors(CORS_ALLOW, `GET, HEAD, OPTIONS`, `referer, origin, content-type`));

// Use a listener for fetch event to handle the routing
addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    router
      .handle(event.request, event) // Router handles the requests
      .then((res) => wrapCorsHeader(event.request, res, { allowedOrigin: CORS_ALLOW }))
  );
});
