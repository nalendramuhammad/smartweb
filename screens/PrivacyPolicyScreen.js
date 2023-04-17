import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "black",
            height: 2,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Tab.Screen name="English" component={PrivacyPolicyEnglishScreen} />
        <Tab.Screen name="Indonesia" component={PrivacyPolicyIndonesiaScreen} />
      </Tab.Navigator>
    </View>
  );
}

function PrivacyPolicyEnglishScreen() {
  return (
    <View style={styles.contentContainer}>
      <Text>Privacy Policy in English</Text>
    </View>
  );
}

function PrivacyPolicyIndonesiaScreen() {
  return (
    <View style={styles.contentContainer}>
      <Text>Kebijakan Privasi dalam Bahasa Indonesia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PrivacyPolicyScreen;
