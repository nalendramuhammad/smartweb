import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import supabase from "../supabase/supabase";
import sha256 from "crypto-js/sha256";

const SignInScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleForgotPassword = () => {
    // Handle forgot password logic here
  };

  const handleSubmit = async () => {
    try {
      // Hash the password before comparing it with the hashed password in the database
      const hashedPassword = sha256(password).toString();

      // Query the Supabase "users" table to find a user with the given email or name and hashed password
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .or(`name.eq.${name},email.eq.${name}`)
        .eq("password", hashedPassword)
        .single();

      if (error) {
        console.log("Error signing in:", error.message);
      } else if (!data) {
        console.log("Invalid username or password");
      } else {
        // success message or redirect to next page
        console.log("Signed in successfully");
      }
    } catch (error) {
      console.log("Error signing in:", error.message);
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      // Save the username in local storage
      AsyncStorage.setItem("name", name);
    } else {
      // Remove the name from local storage
      AsyncStorage.removeItem("name");
    }
  };

  useEffect(() => {
    // Check if the username is stored in local storage
    AsyncStorage.getItem("name").then((value) => {
      if (value !== null) {
        setName(value);
        setRememberMe(true);
      }
    });
  }, []);

  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "YOUR_APP_ID",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        // You can use the token to authenticate the user on the server
        console.log("Facebook token:", token);
      } else if (type === "cancel") {
        console.log("Facebook login cancelled");
      } else {
        console.log("Facebook login error:", type);
      }
    } catch (error) {
      console.log("Facebook login error:", error.message);
    }
  };

  // Function to handle login with Google
  const handleGoogleLogin = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: "YOUR_ANDROID_CLIENT_ID",
        iosClientId: "YOUR_IOS_CLIENT_ID",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        // You can use the token to authenticate the user on the server
        console.log("Google token:", accessToken);
      } else if (type === "cancel") {
        console.log("Google login cancelled");
      } else {
        console.log("Google login error:", type);
      }
    } catch (error) {
      console.log("Google login error:", error.message);
    }
  };

  // Function to handle login with Apple
  const handleAppleLogin = async () => {
    try {
      const { identityToken, email } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // You can use the identityToken and email to authenticate the user on the server
      console.log("Apple identity token:", identityToken);
      console.log("Apple email:", email);
    } catch (error) {
      console.log("Apple login error:", error.message);
    }
  };

  const [fontsLoaded] = useFonts({
    "Sedan-Regular": require("../assets/fonts/Sedan-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="{Platform.OS === 'ios' ? 'padding' : 'height'}"
    >
      <Text style={styles.title}>NAON</Text>
      <TextInput
        style={styles.input}
        placeholder="username or email"
        value={name}
        defaultValue={rememberMe ? name : ""}
        onChangeText={setName}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.passwordIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesome
            name={showPassword ? "eye-slash" : "eye"}
            size={24}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rememberForgotContainer}>
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity onPress={handleRememberMe}>
            <FontAwesome
              name={rememberMe ? "check-square-o" : "square-o"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.borderIconsContainer}>
        <Text style={styles.borderIconsText}>or sign in with</Text>
        <View style={styles.borderIconContainer}>
          <TouchableOpacity onPress={handleFacebookLogin}>
            <View style={styles.borderIcon}>
              <FontAwesome name="facebook" size={24} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <View style={styles.borderIcon}>
              <FontAwesome name="google" size={24} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAppleLogin}>
            <View style={styles.borderIcon}>
              <FontAwesome name="apple" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={styles.bottomContainer}
      >
        <Text style={styles.bottomText}>
          don’t have an account?
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    marginBottom: 32,
    fontFamily: "Sedan-Regular",
  },
  input: {
    width: 342,
    height: 52,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    width: 342,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
  },
  passwordIcon: {
    padding: 8,
  },
  rememberForgotContainer: {
    width: 342,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 13,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: "black",
  },
  button: {
    width: 342,
    height: 52,
    backgroundColor: "#52734D",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  borderIconsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  borderIconsText: {
    marginBottom: 10,
  },
  borderIconContainer: {
    flexDirection: "row",
  },
  borderIcon: {
    width: 50,
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginText: {
    fontSize: 12,
    color: "#52734D",
    alignSelf: "center",
    marginLeft: 5,
  },
});

export default SignInScreen;
