import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.contentContainer}>
        <Text style={{ textAlign: "center" }}>
          The use of the Online Savings Application ("Application") is subject
          to the following terms and conditions. By downloading and using the
          Application, you are deemed to have read, understood, and agreed to
          all the terms in this User Agreement.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.listItem}>1. Definitions {"\n"}</Text>
          <Text style={styles.listText}>
            "Application" means the Nabung Online mobile application that can be
            downloaded and accessed through Android and iOS mobile devices.
            {"\n\n"}
          </Text>
          <Text style={styles.listText}>
            "We" means the owner and manager of the Application.{"\n\n"}
          </Text>
          <Text style={styles.listText}>
            "You" or "User" means the Application user.{"\n\n"}
          </Text>
          <Text style={styles.listItem}>2. Application Use {"\n"}</Text>
          <Text style={styles.listText}>
            The Application may only be used for personal and non-commercial
            purposes. The use of the Application is entirely the responsibility
            of the User, and the User agrees not to use the Application for
            illegal purposes or to harm others. The Application may only be used
            by adults who are 18 years or older.{"\n\n"}
          </Text>
          <Text style={styles.listItem}>3. User Account {"\n"}</Text>
          <Text style={styles.listText}>
            To use the Application, the User must create a user account by
            providing accurate and complete personal information. The User is
            responsible for maintaining the confidentiality of their login
            information and password. We reserve the right to suspend or delete
            User accounts that violate these User Agreement or other applicable
            terms.{"\n\n"}
          </Text>
          <Text style={styles.listItem}>
            4. Services and Transactions {"\n"}
          </Text>
          <Text style={styles.listText}>
            The Application provides a service to help Users save money online
            and earn interest according to applicable terms and conditions.
            Transactions carried out through the Application must be done
            correctly and in accordance with applicable procedures. We are not
            responsible for losses or errors that occur due to the use of the
            Application.{"\n\n"}
          </Text>
          <Text style={styles.listItem}>5. Privacy Policy {"\n"}</Text>
          <Text style={styles.listText}>
            We respect the User's privacy and will protect their personal
            information. We will collect, use, and store User's personal
            information in accordance with our applicable privacy policy.
            {"\n\n"}
          </Text>
          <Text style={styles.listItem}>
            6. Changes to the User Agreement {"\n"}
          </Text>
          <Text style={styles.listText}>
            We reserve the right to make changes to this User Agreement without
            prior notice. Any changes made will be effective from the date of
            publication on the Application.{"\n\n"}
          </Text>
          <Text style={styles.listItem}>7. Indemnification {"\n"}</Text>
          <Text style={styles.listText}>
            The User agrees to indemnify any losses, costs, and expenses that
            arise from any violation of this User Agreement or other applicable
            terms.{"\n\n"}
          </Text>
          <Text style={styles.listItem}>8. Dispute Resolution {"\n"}</Text>
          <Text style={styles.listText}>
            In the event of a dispute related to the use of the Application, the
            User agrees to resolve it through good faith negotiations. {"\n\n"}
            If negotiations fail to reach a settlement, the dispute will be
            settled through the applicable court procedures. {"\n"}
          </Text>
        </Text>
      </View>
    </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 53,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 35,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 24,
  },
  listItem: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  listText: {
    flex: 1,
    fontSize: 16,
  },
});

export default PrivacyPolicyScreen;
