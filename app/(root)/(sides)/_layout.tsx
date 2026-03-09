import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0, 
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 25,
            color: '#1F2937',
          },
          headerTintColor: '#147bf0',

         
          drawerStyle: {
            backgroundColor: '#fff',
            width: 280,
          },

          // Item Styles (The "Magic" part)
          drawerActiveTintColor: '#147bf0', 
          drawerInactiveTintColor: '#6B7280', // Text/Icon color when inactive
          drawerActiveBackgroundColor: '#f0f7ff', // Soft light blue background
          drawerInactiveBackgroundColor: 'transparent', 
          
          drawerLabelStyle: {
            marginLeft: -15,
            fontSize: 15,
            fontWeight: '600',
          },
          drawerItemStyle: {
            borderRadius: 12,
            marginHorizontal: 10,
            paddingHorizontal: 5,
          },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Today',
            title: 'Today',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="today-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="calendar"
          options={{
            drawerLabel: 'Calendar',
            title: 'Calendar',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="past"
          options={{
            drawerLabel: 'History',
            title: 'History',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;