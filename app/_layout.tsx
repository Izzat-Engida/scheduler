import { initDataBase } from '@/database/db'
import { useTaskStore } from '@/store/tasksStore'
import {Stack} from 'expo-router'
import { useEffect } from 'react'
import Modal from 'react-native-modal'
import * as Notifications from 'expo-notifications';
import { View } from 'react-native';
import AddTask from '@/components/AddTask'
import { configureNotifications } from '@/services/notifications';
import { COLORS } from '@/constants/theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
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

  
      await configureNotifications();
    }
  
   
    setupApp();


  const interval=setInterval(()=>{
    loadTasks();
  },60000)
  return ()=>clearInterval(interval)
  },[loadTasks])

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
    backgroundColor: COLORS.paper, 
    height: '97%', 
    borderTopLeftRadius: 0, borderTopRightRadius: 0, borderWidth: 3, borderColor: COLORS.ink,
    padding: 20 
  }}>
    <AddTask />
  </View>
    </Modal>
    </View>

  )
}

export default RootLayout
