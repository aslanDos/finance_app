import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={34} color="#8e8e93" />
      </TouchableOpacity>
      <Text style={styles.title}>Finance Assistant</Text>
      <View style={{ width: 34 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e5ea",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});
