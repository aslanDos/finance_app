import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useStore } from "@/store/useStore";

import SummaryCards from "@/components/(home)/SummaryCards";
import SearchBar from "@/components/(home)/SearchBar";
import TransactionList from "@/components/(home)/TransactionList";
import AddTransactionButton from "@/components/(home)/AddTransactionButton";

import AddTransactionModal, {
  AddTransactionPayload,
} from "@/components/(home)/modals/AddTransactionModal";

import EditTransactionModal from "@/components/(home)/modals/EditTransactionModal";

export default function Index() {
  const [editId, setEditId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // === NEW STORE FIELDS ===
  const transactions = useStore((s) => s.transactions);
  const fetchTransactions = useStore((s) => s.fetchTransactions);

  const fetchCategories = useStore((s) => s.fetchCategories);
  const fetchPaymentMethods = useStore((s) => s.fetchPaymentMethods);

  const addTransaction = useStore((s) => s.addTransaction);

  // === INITIAL LOAD ===
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchPaymentMethods();
  }, []);

  // === ADD NEW TRANSACTION ===
  const handleAddTransaction = async (payload: AddTransactionPayload) => {
    await addTransaction({
      amount: payload.amount,
      type: payload.type,
      note: payload.description || payload.category,
      date: payload.date.toISOString(),

      // временные поля, пока не подключены реальные сущности
      category_id: payload.category ?? "uncategorized",
      payment_id: "default-wallet",
      operation_kind: "regular",
    });

    setOpenModal(false);
  };

  return (
    <View style={styles.container}>
      {/* 🔹 TOP SECTION */}
      <View style={styles.topSection}>
        <SearchBar placeholder="Oct 31, 2025 - Nov 6, 2025" icon="calendar" />

        <SummaryCards />

        <SearchBar
          placeholder="Search transactions..."
          icon="search"
          showFilter
        />
      </View>

      {/* 🔹 TRANSACTION LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TransactionList
          data={transactions}
          onEdit={(id) => setEditId(id)}
        />
      </ScrollView>

      {/* 🔹 BOTTOM BUTTON */}
      <View style={styles.bottomSection}>
        <AddTransactionButton onPress={() => setOpenModal(true)} />
      </View>

      {/* 🔹 MODALS */}
      <AddTransactionModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddTransaction}
      />

      <EditTransactionModal
        visible={!!editId}
        transactionId={editId}
        onClose={() => setEditId(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
  },
  topSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f9f9fb",
  },
  scrollContent: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#ededf0",
    paddingBottom: 100,
  },
  bottomSection: {
    borderTopColor: "#e5e5ea",
    borderTopWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
