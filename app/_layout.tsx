import { initDataBase } from '@/database/db'
import { useTaskStore } from '@/store/tasksStore'
import {Stack} from 'expo-router'
import { useEffect } from 'react'


const RootLayout = () => {
  const {loadTasks}=useTaskStore()
  useEffect(()=>{
    initDataBase()
    loadTasks()
  },[])
  return (
    <Stack screenOptions={{headerShown: false}}>
      
    </Stack>
  )
}

export default RootLayout