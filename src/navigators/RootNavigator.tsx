import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import MeetUp from "components/MeetUp";
import Login from "components/Login";
import PrimarySignUp from "components/SignUp/PrimarySignUp";
import SecondarySignUp from "components/SignUp/SecondarySignUp";
import ThirdarySignUp from "components/SignUp/ThirdarySignUp";
import FindPassword from "components/FindPassword";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import axios from "axios";
import { RETOKEN_URL } from "./apiUrls";
import { setUserToken } from "components/Login/redux/actions";
import { LoginResponse } from "components/Login/redux/types";
import qs from "qs";

const RootStack = createStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();

  const [isUserValid, setIsUserValid] = React.useState<boolean>(false);
  const userToken = useSelector(getUserToken);

  React.useEffect(() => {
    if (userToken !== null) {
      axios
        .post<LoginResponse>(
          RETOKEN_URL,
          qs.stringify({
            accessToken: userToken.accessToken,
            // refreshToken: userToken.refreshToken,
          })
        )
        .then((response) => {
          dispatch(
            setUserToken({
              accessToken: response.data.accessToken,
              // refreshToken: response.data.refreshToken,
            })
          );
          setIsUserValid(true);
        })
        .catch(() => {
          setIsUserValid(false);
        });
    }
  }, [userToken.accessToken]);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: `${theme.colors.white}`,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitleAlign: "left",
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
        {isUserValid == true ? (
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
