
import React from 'react'
import { Stack } from 'expo-router'

const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="(sides)" /> 
</Stack>
  )
}

export default MainLayout