import { useTranslation } from "@plexswap/localization";
import { Balance, Button, Flex, Heading, Skeleton, Text, useModal } from '@plexswap/ui-plex';
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from "@plexswap/utils/formatBalance";
import BigNumber from "bignumber.js";
import { ReactElement, ReactNode } from "react";
import { CollectModalProps } from "./CollectModal";
import { HarvestAction as TableHarvestAction } from "./PoolsTable/HarvestAction";
import { HarvestActionsProps } from "./types";

export const BalanceWithActions: React.FC<
  React.PropsWithChildren<
    Omit<HarvestActionsProps, "onPresentCollect"> & {
      actions: ReactNode;
    }
  >
> = ({ earnings, isLoading, earningTokenPrice, earningTokenBalance, earningTokenDollarBalance, actions }) => {
  const hasEarnings = earnings.toNumber() > 0;

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="16px">
      <Flex flexDirection="column">
        {isLoading ? (
          <Skeleton width="80px" height="48px" />
        ) : (
          <>
            {hasEarnings ? (
              <>
                <Balance bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        )}
      </Flex>
      {actions}
    </Flex>
  );
};

export const HarvestActions: React.FC<React.PropsWithChildren<HarvestActionsProps>> = ({
  earnings,
  isLoading,
  onPresentCollect,
  earningTokenPrice,
  earningTokenBalance,
  earningTokenDollarBalance,
}) => {
  const { t } = useTranslation();
  const hasEarnings = earnings.toNumber() > 0;

  return (
    <BalanceWithActions
      earnings={earnings}
      isLoading={isLoading}
      earningTokenPrice={earningTokenPrice}
      earningTokenBalance={earningTokenBalance}
      earningTokenDollarBalance={earningTokenDollarBalance}
      actions={
        <Button disabled={!hasEarnings} onClick={onPresentCollect}>
          {t("Harvest")}
        </Button>
      }
    />
  );
};

interface WithHarvestActionsProps {
  earnings: BigNumber;
  earningTokenSymbol: string;
  poolId: number;
  isBnbPool: boolean;
  earningTokenPrice: number;
  isLoading?: boolean;
  earningTokenDecimals: number;
  earningTokenAddress?: string;
  poolAddress?: string;
}

const withCollectModalFactory =
  (ActionComp: any) =>
  (CollectModalComponent: (props: CollectModalProps) => ReactElement) =>
  ({
    earnings,
    earningTokenSymbol,
    earningTokenAddress,
    earningTokenDecimals,
    poolId,
    isBnbPool,
    earningTokenPrice,
    isLoading,
    poolAddress,
    ...props
  }: WithHarvestActionsProps) => {
    const earningTokenBalance: number = getBalanceNumber(earnings, earningTokenDecimals);

    const formattedBalance = formatNumber(earningTokenBalance, 5, 5);

    const fullBalance = getFullDisplayBalance(earnings, earningTokenDecimals);

    const earningTokenDollarBalance = earnings
      ? getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningTokenDecimals)
      : 0;

    const [onPresentCollect] = useModal(
      <CollectModalComponent
        formattedBalance={formattedBalance}
        fullBalance={fullBalance}
        earningTokenSymbol={earningTokenSymbol}
        earningsDollarValue={earningTokenDollarBalance}
        poolId={poolId}
        isBnbPool={isBnbPool}
        earningTokenAddress={earningTokenAddress}
        poolAddress={poolAddress}
      />
    );

    return (
      <ActionComp
        onPresentCollect={onPresentCollect}
        earnings={earnings}
        earningTokenPrice={earningTokenPrice}
        earningTokenDollarBalance={earningTokenDollarBalance}
        earningTokenBalance={earningTokenBalance}
        isLoading={isLoading}
        earningTokenSymbol={earningTokenSymbol}
        {...props}
      />
    );
  };

export const withCollectModalTableAction = withCollectModalFactory(TableHarvestAction);

export const withCollectModalCardAction = withCollectModalFactory(HarvestActions);
