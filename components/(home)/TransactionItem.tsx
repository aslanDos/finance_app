// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
//
// export default function TransactionItem({
//                                           title,
//                                           date,
//                                           amount,
//                                           category,
//                                           icon,
//                                           color,
//                                           bg,
//                                         }: any) {
//   return (
//     <View style={[styles.container, { backgroundColor: bg }]}>
//       <View style={styles.left}>
//         <View style={[styles.iconContainer, { backgroundColor: "#fff" }]}>
//           <Ionicons name={icon} size={22} color={color} />
//         </View>
//         <View>
//           <Text style={styles.title}>{title}</Text>
//           <Text style={styles.subtitle}>{date}</Text>
//         </View>
//       </View>
//       <View>
//         <Text style={[styles.amount, { color }]}>{amount}</Text>
//         <Text style={styles.subtitle}>{category}</Text>
//       </View>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//     borderRadius: 16,
//     padding: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   left: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 100,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: "600",
//   },
//   subtitle: {
//     fontSize: 13,
//     color: "#8e8e93",
//   },
//   amount: {
//     fontSize: 15,
//     fontWeight: "600",
//     textAlign: "right",
//   },
// });
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionItem({ title, amount, type, date }: any) {
  const isIncome = type === "income";
  const color = isIncome ? "#00C851" : "#ff4444";
  const icon = isIncome ? "arrow-down" : "arrow-up";

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={[styles.amount, { color }]}>
        {isIncome ? "+" : "-"}${Math.abs(amount).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f2f2f7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    color: "#8e8e93",
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
  },
});
