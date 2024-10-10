const requireCheck = [ COINMARKETCAP_API_KEY]
requireCheck.forEach((node) => {
  if (!node) {
    throw new Error('Missing env var')
  }
})
