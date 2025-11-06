import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";


export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header / Illustration */}
      <View style={styles.top}>
        <Image
          source={require('../../assets/welcome_icon.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to FinanceApp</Text>
        <Text style={styles.subtitle}>
          Track your income, expenses, and plan your financial future.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.signInBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 50,
  },
  top: {
    alignItems: "center",
    marginTop: 80,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 70,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  bottom: {
    alignItems: "center",
  },
  signInBtn: {
    backgroundColor: "#E53935",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpBtn: {
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 30,
  },
  signUpText: {
    color: "#E53935",
    fontSize: 16,
    fontWeight: "600",
  },
});
