// Add setImmediate polyfill
if (typeof setImmediate === 'undefined') {
  global.setImmediate = setTimeout;
}

import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    <Stack.Screen name="index" options={{headerShown:false}} />
    <Stack.Screen name="signup" options={{headerShown:false}} />
    <Stack.Screen name="donor" options={{headerShown:false}} />
    <Stack.Screen name="profile" options={{headerShown:false}} />
    <Stack.Screen name="personalinfo" options={{headerShown:true, title:"Personal Info"}} />
    <Stack.Screen name="address" options={{headerShown:true, title:"Address"}} />



  </Stack>;
}
