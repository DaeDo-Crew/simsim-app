import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import MeetUp from "components/MeetUp";
import Login from "components/Login";
import PrimarySignUp from "components/SignUp/PrimarySignUp";
import SecondarySignUp from "components/SignUp/SecondarySignUp";
import ThirdarySignUp from "components/SignUp/ThirdarySignUp";
import FindId from "components/FindId";
import FindPassword from "components/FindPassword";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";

const RootStack = createStackNavigator();

export default function RootNavigator() {
  const userToken = useSelector(getUserToken);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: `${theme.colors.white}`,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTintColor: `${theme.colors.black}`,
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
        {userToken !== null && userToken.accessToken !== null ? (
          <>
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="MeetUp" component={MeetUp} />
          </>
        ) : (
          <>
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="PrimarySignUp" component={PrimarySignUp} />
            <RootStack.Screen
              name="SecondarySignUp"
              component={SecondarySignUp}
            />
            <RootStack.Screen
              name="ThirdarySignUp"
              component={ThirdarySignUp}
            />
            <RootStack.Screen name="FindId" component={FindId} />
            <RootStack.Screen name="FindPassword" component={FindPassword} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerBackIcon: {
    marginLeft: 10,
    color: theme.colors.black,
  },
});
