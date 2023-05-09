import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import HomeScreen from "./HomeScreen";

const VerifyEmailScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  const handleCodeChange = (value, ref) => {
    if (value.length > 0) {
      setVerificationCode(verificationCode + value); // update the verificationCode state variable
      if (ref && ref.current) {
        ref.current.focus();
      }
    } else if (ref && ref.current) {
      if (
        ref.current._lastNativeText &&
        ref.current._lastNativeText.length > 0
      ) {
        ref.current.setNativeProps({ text: "" });
      } else {
        const previousRef = getPreviousRef(ref);
        if (previousRef && previousRef.current) previousRef.current.focus();
      }
    }
    if (verificationCode.length === 3) {
      // send the verificationCode to the user's email
      // sendCodeToEmail(email, verificationCode);
    }
  };

  const handleSubmit = async () => {
    try {
      if (verificationCode.length !== 4) {
        alert("Verification code must be 4 digits");
      } else {
        alert("Verified")
      }
    } catch (error) {
      console.log("Error inserting user:", error.message);
      alert(error.message);
    }
  };
  

  const getPreviousRef = (ref) => {
    switch (ref) {
      case fourthInputRef:
        return thirdInputRef;
      case thirdInputRef:
        return secondInputRef;
      case secondInputRef:
        return firstInputRef;
      default:
        return null;
    }
  };

  const handleResendCode = () => {
    // Code for resending verification email goes here
  };


  return (
    <View style={styles.container}>
      <View style={styles.blob}>
        <Image
          source={require("../assets/pictures/blob.png")}
          style={styles.blobImage}
          resizeMode="contain"
        />
        <View style={styles.mailWrapper}>
          <Image
            source={require("../assets/pictures/mail.png")}
            style={styles.mailImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>A 4-digit code has been sent to:</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.form}>
        <TextInput
          ref={firstInputRef}
          style={styles.codeInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(value) => handleCodeChange(value, secondInputRef)}
        />
        <TextInput
          ref={secondInputRef}
          style={styles.codeInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(value) => handleCodeChange(value, thirdInputRef)}
        />
        <TextInput
          ref={thirdInputRef}
          style={styles.codeInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(value) => handleCodeChange(value, fourthInputRef)}
        />
        <TextInput
          ref={fourthInputRef}
          style={styles.codeInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(value) => handleCodeChange(value, null)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendLink} onPress={handleResendCode}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  blob: {
    alignItems: "center",
    marginBottom: 20,
  },
  blobImage: {
    width: 270.35,
    height: 256.99,
  },
  mailWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mailImage: {
    position: "absolute",
    width: 150,
    height: 150,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
  },
  subtitle: {
    marginTop: 15,
    fontSize: 16,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  input: {
    height: 50,
    width: 50,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 191, // decrease width to 200
    marginBottom: 25,
    alignSelf: "center", // add alignSelf to center the form horizontally
    marginTop: 20, // add marginTop to create space between form and button
  },

  codeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    textAlign: "center",
    marginRight: 10, // add marginRight to create space between input fields
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    width: 191, // decrease width to 150
    height: 38, // increase height to 50
    borderRadius: 10,
    backgroundColor: "#52734D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // add marginTop to create space between button and resend link
  },

  buttonText: {
    color: "white",
  },
  resendLink: {
    marginTop: 25,
  },
  resendText: {
    color: "#52734D",
  },
});

export default VerifyEmailScreen;
