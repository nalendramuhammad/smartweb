import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { Navigation } from "../Navigation/Navigation";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
      <Text style={{ color: "red" }}>FUCK111</Text>
      <Text style={{ color: "white" }}>fck</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function Navigation{
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    TextColor: "#fff",
  },
});
