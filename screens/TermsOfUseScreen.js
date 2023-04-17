import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function TermsOfUseScreen() {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="English" component={TermsOfUseEnglishScreen} />
        <Tab.Screen name="Indonesia" component={TermsOfUseIndonesiaScreen} />
      </Tab.Navigator>
    </View>
  );
}

function TermsOfUseEnglishScreen() {
  return (
    <View style={styles.contentContainer}>
      <Text>Privacy Policy in English</Text>
    </View>
  );
}

function TermsOfUseIndonesiaScreen() {
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

export default TermsOfUseScreen;
