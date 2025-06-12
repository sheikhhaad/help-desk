import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {signOut } from "firebase/auth";
import { auth } from "../../Firebase/Config";

const handleLogout = () => {
  signOut(auth).then(() => {
    router.push("/");
  }).catch((error) => {
    // An error happened.
  });
  
};


const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="signup" options={{ headerShown: false }} />
      <Tabs.Screen
        name="donor"
        options={{
          headerShown: true,
          title:'Donor',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={'#FF5F15'} />
          ),
          tabBarLabel: "Home",
        }}
      />
     <Tabs.Screen
  name="profile"
  options={{
    headerShown: true,
    title: "Profile",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person-outline" size={size} color={"#FF5F15"} />
    ),
    tabBarLabel: "Profile",

    // 👇 Header Right Button
    headerRight: () => (
      <Ionicons
        name="log-out-outline"
        size={24}
        color="#FF5F15"
        style={{ marginRight: 15 }}
        onPress={() => {
         handleLogout();
        }}
      />
    ),
  }}
/>

      <Tabs.Screen name="personalinfo" options={{ headerShown: false }} />
      <Tabs.Screen name="address" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
