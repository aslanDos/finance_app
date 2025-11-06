import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  showFilter?: boolean;
}

export default function SearchBar({
                                    placeholder = "Search...",
                                    icon = "search",
                                    showFilter = false,
                                  }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={18} color="#8e8e93" />

      {icon === "calendar" ? (
        <Text style={styles.text}>{placeholder}</Text>
      ) : (
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor="#8e8e93"
        />
      )}

      {showFilter && (
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={20} color="#8e8e93" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 42,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: "#000",
  },
  text: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: "#000",
  },
});
