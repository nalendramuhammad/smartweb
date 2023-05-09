import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import CustomSplashScreen from "./screens/SplashScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import TermsOfUseScreen from "./screens/TermsOfUseScreen";
import VerifyEmailScreen from "./screens/VerifyEmailScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="Splash"
          component={CustomSplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detail" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyEmailScreen"
          component={VerifyEmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} 
        options={{
          title: "Privacy Policy",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
          },
        }}/>
        <Stack.Screen
          name="TermsOfUse"
          component={TermsOfUseScreen}
          options={{
            title: "Terms of Use",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    TextColor: "#fff",
  },
  text: {
    color: "black",
    fontFamily: "Sedan-Regular",
    fontSize: 45,
  },
});
