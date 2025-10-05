import { HapticTab } from "@/components/haptic-tab";
import PinkPlusIcon from "@/components/PinkPlusIcon";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import { ChartLine } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarButton: HapticTab, // still applied globally
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
          // 👇 show your pink icon only for this tab
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
          tabBarIcon: () => <ChartLine color="#000000" />,
          tabBarLabel: "",
        }}
      />
    </Tabs>
  );
}
