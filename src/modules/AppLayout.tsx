import * as React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import theme from "theme";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const MainSection = styled(View)`
  flex: 1;
  background-color: ${theme.colors.white};
`;

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;

  return (
    <MainSection>
      {children}
      <StatusBar style="light" />
    </MainSection>
  );
}
