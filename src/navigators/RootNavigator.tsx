import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import theme from "theme";

const RootStack = createStackNavigator();

const PageNavigation = () => (
  <RootStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: `${theme.colors.primary}`,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTintColor: `${theme.colors.white}`,
    }}
  >
    <RootStack.Screen name="Home" component={Home} />
  </RootStack.Navigator>
);

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <PageNavigation />
    </NavigationContainer>
  );
}
