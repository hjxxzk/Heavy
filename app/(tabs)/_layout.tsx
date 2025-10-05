import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ChartLine } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "Weight history",
          tabBarIcon: () => <ChartLine color="#000000" />,
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Track your weight",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: "Weight chart",
          tabBarIcon: () => <ChartLine color="#000000" />,
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
}
