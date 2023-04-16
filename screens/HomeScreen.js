import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Sedan-Regular": require("../assets/fonts/Sedan-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>NAON</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 28 }]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("TermsOfUse")}>
          <Text style={styles.bottomText}>Terms of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text style={styles.bottomText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Sedan-Regular",
    fontSize: 25,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    width: 322,
    height: 52,
    backgroundColor: "#52734D",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    // fontFamily: "Reilway"
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 42,
  },
  bottomText: {
    fontSize: 12,
    marginHorizontal: 51,
  },
});
