import React, { useState } from "react";
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
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

type TxType = "expense" | "income";
type Tab = "manual" | "upload";

export interface AddTransactionPayload {
  type: TxType;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  fileUri?: string | null;
}

export default function AddTransactionModal({
                                              visible,
                                              onClose,
                                              onSubmit,
                                            }: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: AddTransactionPayload) => void;
}) {
  // Tabs
  const [tab, setTab] = useState<Tab>("manual");

  // Manual form state
  const [txType, setTxType] = useState<TxType>("expense");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("Shopping");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState(false);

  // Upload state
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);

  const categories = [
    "Shopping",
    "Subscriptions",
    "Transport",
    "Food & Drinks",
    "Health",
    "Salary",
    "Transfer",
  ];

  const pickDoc = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (res.canceled) return;
    const file = res.assets?.[0];
    if (file) {
      setFileName(file.name);
      setFileUri(file.uri);
    }
  };

  const submitManual = () => {
    const num = parseFloat(amount || "0");
    onSubmit({
      type: txType,
      amount: Number.isFinite(num) ? num : 0,
      category,
      description: description?.trim() || undefined,
      date,
      fileUri: null,
    });
    resetAndClose();
  };

  const submitUpload = () => {
    onSubmit({
      type: txType,
      amount: 0,
      category: "Import",
      description: "Bank statement",
      date: new Date(),
      fileUri: fileUri || null,
    });
    resetAndClose();
  };

  const resetAndClose = () => {
    setTab("manual");
    setTxType("expense");
    setAmount("");
    setCategory("Shopping");
    setDescription("");
    setDate(new Date());
    setFileName(null);
    setFileUri(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Transaction</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close" size={22} color="#222" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, tab === "manual" && styles.tabActive]}
              onPress={() => setTab("manual")}
            >
              <Text style={[styles.tabText, tab === "manual" && styles.tabTextActive]}>Manual</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === "upload" && styles.tabActive]}
              onPress={() => setTab("upload")}
            >
              <Text style={[styles.tabText, tab === "upload" && styles.tabTextActive]}>Upload Statement</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
          >
            {tab === "manual" ? (
              <View style={{ gap: 14 }}>
                {/* Type */}
                <Text style={styles.label}>Type</Text>
                <View style={styles.segment}>
                  <TouchableOpacity
                    style={[styles.segmentBtn, txType === "expense" && styles.segmentActive]}
                    onPress={() => setTxType("expense")}
                  >
                    <Text style={[styles.segmentText, txType === "expense" && styles.segmentTextActive]}>Expense</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.segmentBtn, txType === "income" && styles.segmentActive]}
                    onPress={() => setTxType("income")}
                  >
                    <Text style={[styles.segmentText, txType === "income" && styles.segmentTextActive]}>Income</Text>
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
                  <Text style={{ color: "#111" }}>
                    {date.toLocaleDateString()}
                  </Text>
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
                  <TouchableOpacity style={styles.btnSecondary} onPress={onClose}>
                    <Text style={styles.btnSecondaryText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnPrimary} onPress={submitManual}>
                    <Text style={styles.btnPrimaryText}>Add Transaction</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ gap: 16 }}>
                {/* Upload card */}
                <View style={styles.uploadCard}>
                  <Ionicons name="cloud-upload-outline" size={40} color="#9aa0a6" />
                  <Text style={styles.uploadTitle}>Upload your bank statement</Text>

                  <TouchableOpacity style={styles.chooseBtn} onPress={pickDoc}>
                    <Text style={styles.chooseBtnText}>
                      {fileName ? fileName : "Choose File  No file chosen"}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.hintText}>Supported formats: PDF, CSV, XLSX</Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.btnSecondary} onPress={onClose}>
                    <Text style={styles.btnSecondaryText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btnPrimary, !fileUri && { opacity: 0.5 }]}
                    onPress={submitUpload}
                    disabled={!fileUri}
                  >
                    <Text style={styles.btnPrimaryText}>Upload</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    maxHeight: "88%",
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
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    padding: 4,
    gap: 6,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#0B0B24",
  },
  tabText: {
    color: "#555",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    padding: 4,
    gap: 6,
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
    flexDirection: "row",
    alignItems: "center",
  },
  inputDisabled: {
    justifyContent: "space-between",
  },
  pickerBox: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#f2f2f7",
    overflow: "hidden",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  btnSecondary: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondaryText: {
    fontWeight: "600",
    color: "#111",
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
  uploadCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    backgroundColor: "#fafafa",
    padding: 20,
    alignItems: "center",
    gap: 12,
  },
  uploadTitle: {
    fontSize: 16,
    color: "#5f6368",
    fontWeight: "600",
  },
  chooseBtn: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#eef0f3",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  chooseBtnText: {
    color: "#111",
    fontWeight: "600",
  },
  hintText: {
    color: "#9aa0a6",
    fontSize: 12,
  },
});
