import { FlatList, TouchableOpacity } from "react-native";
import TransactionItem from "./TransactionItem";
import { Transaction } from "@/store/useStore";

export default function TransactionList({
                                          data,
                                          onEdit,
                                        }: {
  data: Transaction[];
  onEdit?: (id: string) => void;
}) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onEdit?.(item.id)}
        >
          <TransactionItem
            title={item.note || "Transaction"}
            amount={item.amount}
            type={item.type}
            date={item.date}
          />
        </TouchableOpacity>
      )}
      scrollEnabled={false}
      contentContainerStyle={{ gap: 10 }}
    />
  );
}
