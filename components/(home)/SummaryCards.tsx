import { View, Text, StyleSheet } from "react-native";
import { useStore } from "@/store/useStore";

export default function SummaryCards() {
  const { statement, balance } = useStore();

  // Calculate totals
  const income = statement
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = statement
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: "#e7f8ef" }]}>
        <Text style={styles.label}>Income</Text>
        <Text style={[styles.value, { color: "#00C851" }]}>
          ${income.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: "#fdeaea" }]}>
        <Text style={styles.label}>Expenses</Text>
        <Text style={[styles.value, { color: "#ff4444" }]}>
          ${expenses.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: "#edf3ff" }]}>
        <Text style={styles.label}>Balance</Text>
        <Text style={[styles.value, { color: "#007AFF" }]}>
          ${balance.total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#777",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
});
