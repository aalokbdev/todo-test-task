import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
        name="index"
        options={{
          title: 'Authenticate',
        }}
      />
      <Stack.Screen
        name="TodoListScreen"
        options={{
          title: 'Home',
        }}
      />
      
    </Stack>
  );
}
