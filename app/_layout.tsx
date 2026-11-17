import { initDataBase } from '@/database/db'
import { useTaskStore } from '@/store/tasksStore'
import {Stack} from 'expo-router'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications';
import { Modal, View, Pressable, StyleSheet } from 'react-native';
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
    <Modal visible={isadd} transparent animationType="slide" onRequestClose={closeAddTask}>
      <View style={modalStyles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeAddTask} />
        <View style={modalStyles.sheet}><AddTask /></View>
      </View>
    </Modal>
    </View>

  )
}

export default RootLayout

const modalStyles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(16,42,67,0.35)' },
  sheet: { backgroundColor: COLORS.paper, height: '97%', borderTopWidth: 3, borderColor: COLORS.ink, padding: 20 },
});
