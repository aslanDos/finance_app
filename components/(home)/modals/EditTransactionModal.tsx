import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useStore } from "@/store/useStore";

type TxType = "expense" | "income";

export default function EditTransactionModal({
                                               visible,
                                               onClose,
                                               transactionId,
                                             }: {
  visible: boolean;
  onClose: () => void;
  transactionId: string | null;
}) {
  const { transactions, deleteTransaction, addTransaction } = useStore();

  // FIXED: Было `statement.find`, теперь:
  const transaction = transactions.find((t) => t.id === transactionId);

  const [type, setType] = useState<TxType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Shopping");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    if (transaction) {
      setType(transaction.type as TxType);
      setAmount(transaction.amount.toString());
      setDescription(transaction.note || "");
      setCategory(transaction.category_id || "Shopping");
      setDate(new Date(transaction.date));
    }
  }, [transaction]);

  const categories = [
    "Shopping",
    "Subscriptions",
    "Transport",
    "Food & Drinks",
    "Health",
    "Salary",
    "Transfer",
  ];

  if (!transaction) return null;

  const handleSave = async () => {
    await deleteTransaction(transaction.id);

    await addTransaction({
      amount: parseFloat(amount || "0"),
      type,
      note: description || category,
      date: date.toISOString(),

      // Временно ставим category_id и payment_id
      category_id: category, // временно
      payment_id: transaction.payment_id ?? "default-wallet",

      // Тип операции — заглушка, позже ты подставишь реальное значение
      operation_kind: "regular",
    });

    onClose();
  };

  const handleDelete = async () => {
    await deleteTransaction(transaction.id);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Edit Transaction</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#222" />
            </TouchableOpacity>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Type */}
            <Text style={styles.label}>Type</Text>
            <View style={styles.segment}>
              <TouchableOpacity
                style={[styles.segmentBtn, type === "expense" && styles.segmentActive]}
                onPress={() => setType("expense")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    type === "expense" && styles.segmentTextActive,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.segmentBtn, type === "income" && styles.segmentActive]}
                onPress={() => setType("income")}
              >
                <Text
                  style={[
                    styles.segmentText,
                    type === "income" && styles.segmentTextActive,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>

            {/* Amount */}
            <Text style={styles.label}>Amount</Text>
            <TextInput
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#b0b0b5"
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
            />

            {/* Category */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={category}
                onValueChange={(val) => setCategory(val)}
                dropdownIconColor="#8e8e93"
                style={{ color: "#111" }}
              >
                {categories.map((c) => (
                  <Picker.Item label={c} value={c} key={c} />
                ))}
              </Picker>
            </View>

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="e.g., Grocery shopping"
              placeholderTextColor="#b0b0b5"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />

            {/* Date */}
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              style={[styles.input, styles.inputDisabled]}
              activeOpacity={0.7}
            >
              <Text style={{ color: "#111" }}>{date.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={18} color="#8e8e93" />
            </TouchableOpacity>

            {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(_, d) => {
                  setShowDate(false);
                  if (d) setDate(d);
                }}
              />
            )}

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnDelete} onPress={handleDelete}>
                <Ionicons name="trash-outline" size={16} color="#fff" />
                <Text style={styles.btnDeleteText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
                <Text style={styles.btnPrimaryText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    maxHeight: "85%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -2 },
      },
      android: { elevation: 12 },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    padding: 4,
    gap: 6,
    marginBottom: 10,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#0B0B24",
  },
  segmentText: {
    color: "#555",
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#fff",
  },
  input: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 12,
    color: "#111",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputDisabled: {
    justifyContent: "space-between",
  },
  pickerBox: {
    height: 46,
    borderRadius: 10,
    // backgroundColor: "#f2f2f7",
    overflow: "hidden",
    justifyContent: "center",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  btnPrimary: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#0B0B24",
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    fontWeight: "600",
    color: "#fff",
  },
  btnSecondary: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondaryText: {
    fontWeight: "600",
    color: "#111",
  },
  btnDelete: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  btnDeleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});
