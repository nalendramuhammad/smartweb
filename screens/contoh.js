import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useFonts } from "expo-font";
import { FontAwesome } from '@expo/vector-icons';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#ccc" />
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
          <FontAwesome name={showConfirmPassword ? 'eye-slash' : 'eye'} size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.borderIconsContainer}>
        <FontAwesome name="facebook" size={50} color="#000" style={styles.borderIcon} />
        <FontAwesome name="google" size={50} color="#000" style={styles.borderIcon} />
        <FontAwesome name="apple" size={50} color="#000" style={styles.borderIcon} />
      </View>
      <Text style={styles.signupText}>or sign up with</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    width: 342,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
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
    backgroundColor: '#52734D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // add flexDirection to make the icons horizontal
    },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8, // add marginRight to give some space between the text and icons
    },
    iconContainer: {
    flexDirection: 'row',
    },
    icon: {
    width: 50,
    height: 50,
    marginHorizontal: 8, // add marginHorizontal to give some space between the icons
    },
    });
