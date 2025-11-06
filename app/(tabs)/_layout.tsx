import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from '@/components/Header';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <Header/>,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#007AFF", // blue active icon & label
        tabBarInactiveTintColor: "#8e8e93", // gray inactive icon & label
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#e5e5ea",
          borderTopWidth: 1,
          height: 70,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "analytics" : "analytics-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
