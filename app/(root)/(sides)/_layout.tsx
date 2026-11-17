import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.ink,
      tabBarInactiveTintColor: COLORS.muted,
      tabBarStyle: { height: 76, paddingTop: 8, paddingBottom: 12, backgroundColor: COLORS.paper, borderTopWidth: 3, borderTopColor: COLORS.ink },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '900' },
    }}>
      <Tabs.Screen name="home" options={{ title: 'Today', tabBarIcon: ({ color, size }) => <Ionicons name="sunny-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="calendar" options={{ title: 'Plan', tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="focus" options={{ title: 'Focus', tabBarIcon: ({ color, size }) => <Ionicons name="flash-outline" color={color as string} size={size} /> }} />
      <Tabs.Screen name="past" options={{ title: 'Archive', tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-done-outline" color={color as string} size={size} /> }} />
    </Tabs>
  );
}
