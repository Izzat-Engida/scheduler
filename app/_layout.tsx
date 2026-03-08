import { initDataBase } from '@/database/db'
import { useTaskStore } from '@/store/tasksStore'
import {Stack} from 'expo-router'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

const RootLayout = () => {
  const {loadTasks}=useTaskStore()
  useEffect(()=>{
    async function setupApp() {
      
      await initDataBase();
      await loadTasks();

  
      if (Device.isDevice) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Notifications permission not granted!');
          return;
        }
      }

     
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
  
   
    setupApp();
  },[])
  return (
    <Stack screenOptions={{headerShown: false}}>
      
    </Stack>
  )
}

export default RootLayout