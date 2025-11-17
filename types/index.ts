// ===================== BASIC TYPES =====================

export type TxType = "income" | "expense" | "transfer";
export type OperationKind = "regular" | "acquiring" | "transfer";

// ===================== CATEGORY =====================

export interface Category {
  id: string;
  name: string;
  type: TxType;
  parent_id?: string | null;
  icon?: string;
  color?: string;
}

// ===================== PAYMENT METHODS =====================

export type PaymentMethodType = "cash" | "card" | "bank" | "crypto";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  balance: number;
  created_at: string;
}

// ===================== TRANSACTIONS =====================

export interface Transaction {
  id: string;
  amount: number;
  type: TxType; // income | expense | transfer
  operation_kind: OperationKind;
  category_id: string;
  payment_id: string;
  date: string;
  note?: string;
  receipt_filename?: string;
}
