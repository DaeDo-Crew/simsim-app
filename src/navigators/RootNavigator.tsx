import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import MeetUp from "components/MeetUp";
import Login from "components/Login";
import SignUp from "components/SignUp";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const RootStack = createStackNavigator();

const PageNavigation = () => (
  <RootStack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: `${theme.colors.primary}`,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTintColor: `${theme.colors.white}`,
      headerBackImage: () => (
        <MaterialIcons
          name="arrow-back"
          size={theme.size.headerIconSize}
          style={styles.headerBackIcon}
        />
      ),
      headerBackTitleVisible: false,
    }}
  >
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="SignUp" component={SignUp} />
    <RootStack.Screen name="Home" component={Home} />
    <RootStack.Screen name="MeetUp" component={MeetUp} />
  </RootStack.Navigator>
);

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <PageNavigation />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerBackIcon: {
    marginLeft: 10,
    color: theme.colors.white,
  },
});
