import { useTranslation } from "@plexswap/localization";
import { AutoColumn, Button, ErrorIcon, Flex, Text } from '@plexswap/ui-plex';
import { ReactElement } from "react";
import { styled } from "styled-components";
import { StepTitleAnimationContainer } from "./ApproveModalContent";
import { FadePresence } from "./Logos";

const Wrapper = styled.div`
  width: 100%;
`;

export function TransactionErrorContent({
  message,
  onDismiss,
}: {
  message: ReactElement | string;
  onDismiss?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <FadePresence $scale>
          <ErrorIcon color="failure" width="64px" />
        </FadePresence>
        <StepTitleAnimationContainer>
          <Text color="failure" style={{ textAlign: "center", width: "85%", wordBreak: "break-word" }}>
            {message}
          </Text>
        </StepTitleAnimationContainer>
      </AutoColumn>

      {onDismiss ? (
        <StepTitleAnimationContainer>
          <Flex justifyContent="center" pt="24px">
            <Button onClick={onDismiss}>{t("Dismiss")}</Button>
          </Flex>
        </StepTitleAnimationContainer>
      ) : null}
    </Wrapper>
  );
}
