import { initDataBase } from '@/database/db'
import { useTaskStore } from '@/store/tasksStore'
import {Stack} from 'expo-router'
import { useEffect } from 'react'
import Modal from 'react-native-modal'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, View } from 'react-native';
import AddTask from '@/components/AddTask'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})
const RootLayout = () => {
  const {loadTasks,closeAddTask,isadd}=useTaskStore()
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


  const interval=setInterval(()=>{
    loadTasks();
  },60000)
  return ()=>clearInterval(interval)
  },[])

  return (
    <View style={{flex:1}}>
    <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="(root)" />
    <Stack.Screen name="index" />
    </Stack>
     <Modal
    isVisible={isadd}
    onBackdropPress={closeAddTask}
    onSwipeComplete={closeAddTask}
    swipeDirection="down"
    style={{justifyContent: 'flex-end', margin: 0}}
    >
    <View style={{ 
    backgroundColor: 'white', 
    height: '97%', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 20 
  }}>
    <AddTask />
  </View>
    </Modal>
    </View>

  )
}

export default RootLayout