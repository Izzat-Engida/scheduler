import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import BrandMark from '@/components/BrandMark';
import { COLORS } from '@/constants/theme';

// 1. This is the component that shows inside the sliding menu
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      {/* Header Profile Section inside the Drawer */}
      <View style={styles.drawerHeaderProfile}>
        <BrandMark compact />
        <View>
          <Text style={styles.username}>Your day, redesigned.</Text>
          <Text style={styles.userSubtitle}>Make time for what matters.</Text>
        </View>
      </View>

      {/* The actual list of navigation items (Today, Calendar, etc.) */}
      <View style={{ paddingHorizontal: 10 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.paper,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 22,
            color: COLORS.ink,
          },
          headerTintColor: COLORS.ink,

          drawerStyle: {
          backgroundColor: COLORS.paper,
            width: 280,
          },
          drawerActiveTintColor: COLORS.ink,
          drawerInactiveTintColor: COLORS.muted,
          drawerActiveBackgroundColor: COLORS.lemon,
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            marginLeft: -10,
          },
          drawerItemStyle: {
            borderRadius: 12,
            marginVertical: 4,
          },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            title: 'Today',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="today-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="calendar"
          options={{
            title: 'Planboard',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="past"
          options={{
            title: 'Archive',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  drawerHeaderProfile: {
    backgroundColor: COLORS.teal,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.ink,
  },
  userSubtitle: {
    fontSize: 12,
    color: COLORS.ink,
    marginTop: 2,
  },
});

export default DrawerLayout;
