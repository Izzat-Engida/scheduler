import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// 1. This is the component that shows inside the sliding menu
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      {/* Header Profile Section inside the Drawer */}
      <View style={styles.drawerHeaderProfile}>
        <Image
          source={require('../../../assets/images/Izor.png')} 
          style={styles.logo}
        />
        <View>
          <Text style={styles.username}>Hi, User 👋</Text>
          <Text style={styles.userSubtitle}>Manage your time</Text>
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
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 22,
            color: '#1F2937',
          },
          headerTintColor: '#147bf0', // This ensures the menu icon is blue

          drawerStyle: {
            backgroundColor: '#fff',
            width: 280,
          },
          drawerActiveTintColor: '#147bf0',
          drawerInactiveTintColor: '#6B7280',
          drawerActiveBackgroundColor: '#E0F2FF',
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
            title: 'Calendar',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="past"
          options={{
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

const styles = StyleSheet.create({
  drawerHeaderProfile: {
    backgroundColor: '#F9FAFB',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#147bf0',
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  userSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default DrawerLayout;