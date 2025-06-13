import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, View } from "react-native";
import DonorHeader from "../../Component/CustomHeader";
import { auth } from "../../Firebase/Config";

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      // An error happened.
    });
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000000",
          borderRadius: 25,
          marginBottom: 20,
          marginHorizontal: 20,
        },
        tabBarActiveTintColor: "#FF5F15",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarItem: { showIcon: false, showLabel: false },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          tabBarItem: { showIcon: false, showLabel: false },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="donor"
        options={{
          headerShown: true,
          header: () => <DonorHeader />,
          tabBarIcon: ({ size }) => (
            <Ionicons name="home-outline" size={size} color="#FF5F15" />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="Give"
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <View style={{ marginBottom: 10 }}>
              <Ionicons name="add-circle-outline" size={40} color="#FF5F15" />
            </View>
          ),
          tabBarLabel: "Give",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          tabBarIcon: ({ size }) => (
            <Ionicons name="person-outline" size={size} color="#FF5F15" />
          ),
          tabBarLabel: "Profile",
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#FF5F15"
              style={{ marginRight: 15 }}
              onPress={handleLogout}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="personalinfo"
        options={{
          tabBarItem: { showIcon: false, showLabel: false },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="address"
        options={{
          tabBarItem: { showIcon: false, showLabel: false },
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
