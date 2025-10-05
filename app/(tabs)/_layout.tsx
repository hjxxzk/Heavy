import { HapticTab } from "@/components/haptic-tab";
import PinkPlusIcon from "@/components/PinkPlusIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import { CalendarRange, ChartLine } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarButton: HapticTab,
        headerStyle: {
          borderBottomColor: "#000",
          borderBottomWidth: 1,
        },
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          borderTopColor: "#000",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "Weight history",
          tabBarIcon: ({ focused }) => (
            <CalendarRange color="#000000" size={focused ? 32 : 24} />
          ),
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Track your weight",
          tabBarIcon: ({ focused }) => (
            <PinkPlusIcon size={focused ? 36 : 28} />
          ),
          tabBarLabel: "",
        }}
      />

      <Tabs.Screen
        name="chart"
        options={{
          title: "Weight chart",
          tabBarIcon: ({ focused }) => (
            <ChartLine color="#000000" size={focused ? 32 : 24} />
          ),
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
}
