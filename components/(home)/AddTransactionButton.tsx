// components/home/AddTransactionButton.tsx
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AddTransactionButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.text}>+ Add Transaction</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
