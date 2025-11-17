import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "assistant",
      text: "Hello! I'm your AI financial assistant. Ask me anything about your spending, savings, or financial insights!",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message to the UI
    setMessages([
      ...messages,
      { id: Date.now(), from: "user", text: input.trim() },
    ]);

    setInput("");
  };

  return (
    <View style={styles.container}>

      {/* Messages */}
      <ScrollView style={styles.chatArea}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.from === "assistant"
                ? styles.assistantBubble
                : styles.userBubble,
            ]}
          >
            {msg.from === "assistant" && (
              <Ionicons
                name="happy-outline"
                size={20}
                color="#4A90E2"
                style={{ marginBottom: 4 }}
              />
            )}
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask about your finances..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  chatArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  assistantBubble: {
    backgroundColor: "#E8EDF5",
    alignSelf: "flex-start",
  },

  userBubble: {
    backgroundColor: "#4A90E2",
    alignSelf: "flex-end",
  },

  messageText: {
    color: "#333",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },

  sendButton: {
    padding: 12,
    backgroundColor: "#4A90E2",
    borderRadius: 50,
  },
});
