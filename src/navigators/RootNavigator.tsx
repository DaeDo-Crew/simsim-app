import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "components/Home";
import MeetUp from "components/MeetUp";
import Login from "components/Login";
import SignUp from "components/SignUp";
import FindPassword from "components/FindPassword";
import Club from "components/Club";
import MeetUpListAll from "components/Home/MeetUpListAll";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserToken } from "components/Login/redux/selectors";
import { setUserToken } from "components/Login/redux/actions";
import { axiosInstance } from "utils/axiosInstance";
import { getUserValid } from "modules/auth/redux/selectors";
import { setUserValid } from "modules/auth/redux/actions";
// import { TransparentHeader } from "modules/TransparentHeader";

const RootStack = createStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();

  const userToken = useSelector(getUserToken);
  const userValid = useSelector(getUserValid);

  React.useEffect(() => {
    if (userToken.accessToken === null) {
      dispatch(setUserValid(false));
    } else {
      axiosInstance({
        method: "POST",
        url: "/member/retoken",
        params: {
          accessToken: userToken.accessToken,
        },
      })
        .then((response) => {
          dispatch(
            setUserToken({
              accessToken: response.data.accessToken,
              // refreshToken: response.data.refreshToken,
            })
          );
          dispatch(setUserValid(true));
        })
        .catch((error) => {
          console.log(error);
        });
      setUserValid(true);
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
        {userValid == true ? (
          <>
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen
              name="MeetUp"
              component={MeetUp}
              // options={{
              //   headerTransparent: true,
              //   headerBackground: TransparentHeader,
              // }}
            />
            <RootStack.Screen name="Club" component={Club} />
            <RootStack.Screen name="MeetUpListAll" component={MeetUpListAll} />
          </>
        ) : (
          <>
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="SignUp" component={SignUp} />
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
