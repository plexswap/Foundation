import { Flex } from '@plexswap/ui-plex';
import { ReactNode } from "react";

export const StatWrapper: React.FC<React.PropsWithChildren<{ label: ReactNode }>> = ({ children, label }) => {
  return (
    <Flex mb="2px" justifyContent="space-between" alignItems="center" width="100%">
      {label}
      <Flex alignItems="center">{children}</Flex>
    </Flex>
  );
};
