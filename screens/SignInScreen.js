import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

const SignInScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  
  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: 'YOUR_APP_ID',
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
  
      if (type === 'success') {
        // You can use the token to authenticate the user on the server
        console.log('Facebook token:', token);
      } else if (type === 'cancel') {
        console.log('Facebook login cancelled');
      } else {
        console.log('Facebook login error:', type);
      }
    } catch (error) {
      console.log('Facebook login error:', error.message);
    }
  };
  
  // Function to handle login with Google
  const handleGoogleLogin = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      });
  
      if (type === 'success') {
        // You can use the token to authenticate the user on the server
        console.log('Google token:', accessToken);
      } else if (type === 'cancel') {
        console.log('Google login cancelled');
      } else {
        console.log('Google login error:', type);
      }
    } catch (error) {
      console.log('Google login error:', error.message);
    }
  };
  
  // Function to handle login with Apple
  const handleAppleLogin = async () => {
    try {
      const { identityToken, email } = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
  
      // You can use the identityToken and email to authenticate the user on the server
      console.log('Apple identity token:', identityToken);
      console.log('Apple email:', email);
    } catch (error) {
      console.log('Apple login error:', error.message);
    }
  };

  const [fontsLoaded] = useFonts({
    "Sedan-Regular": require("../assets/fonts/Sedan-Regular.ttf"),
  });

  const handleSubmit = () => {
    // TODO: handle form submission
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NAON</Text>
      <TextInput
        style={styles.input}
        placeholder="username or email"
        value={name}
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
        don’t have an account? 
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
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
    justifyContent: "center",
    position: "absolute",
    bottom: 39,
    alignSelf: "center",
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
