import { useTranslation } from "@plexswap/localization";
import { FlexGap, Link, Text } from "@plexswap/ui-plex";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
  entity?: ReactNode;
  href?: string;
  suffix?: ReactNode;
};

export function PoweredBy({ children, href, suffix }: PropsWithChildren<Props>) {
  const { t } = useTranslation();
  return (
    <FlexGap gap="0.5rem" flexDirection="row" alignItems="center">
      <FlexGap gap="0.25rem" flexDirection="row" alignItems="center">
        <Text color="text">{t("Powered by")}</Text>
        <Link color="text" external href={href}>
          {children}
        </Link>
      </FlexGap>
      {suffix}
    </FlexGap>
  );
}
