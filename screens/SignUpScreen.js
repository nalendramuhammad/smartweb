import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import supabase from "../supabase/supabase";
import sha256 from "crypto-js/sha256";
import emailjs from "emailjs-com";

const SignUpScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const sendOtpEmail = async (email, otpCode) => {
    try {
      const templateParams = {
        email: email,
        otpCode: otpCode,
      };
      const userId = "MCc8bgwE3fXAGwXle";
      const serviceId = "service_zoejhst";
      const templateId = "template_s6nmrsl";
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );
      console.log(`OTP code sent to ${email}`);
    } catch (error) {
      console.log("Error sending OTP code:", error);
    }
  };
  
  

  const handleSubmit = async () => {
    try {
      // Check if email is valid
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email");
        return;
      }

      // Generate OTP code
      const otpCode = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

      // Hash the password before inserting it into the database
      const hashedPassword = sha256(password).toString();

      // Insert the user data into the Supabase "users" table
      const { error } = await supabase
        .from("users")
        .insert({ name, email, password: hashedPassword })
        .single();

      if (error) {
        alert(error.message);
      } else {
        // Send OTP code to email
        await sendOtpEmail(email, otpCode); // <-- Call the sendOtpEmail function here

        // Success message and set verification code
        console.log("User inserted successfully");

        // Navigate to verification screen
        navigation.navigate("VerifyEmailScreen", { email, otpCode });
      }
    } catch (error) {
      console.log("Error inserting user:", error.message);
      alert(error.message);
    }
  };

  // Function to handle login with Facebook
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
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>NAON</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.passwordIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <FontAwesome
            name={showConfirmPassword ? "eye-slash" : "eye"}
            size={24}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.borderIconsContainer}>
        <Text style={styles.borderIconsText}>or sign up with</Text>
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
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          already have an account?
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.loginText}>Login</Text>
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
  button: {
    width: 342,
    height: 52,
    backgroundColor: "#52734D",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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

export default SignUpScreen;
