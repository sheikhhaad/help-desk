import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../assets/images/logo.png";
import { auth, db } from "../Firebase/Config";

const DonorHeader = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
            console.log("User data fetched:", userSnap.data());
          } else {
            console.log("No user data found");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        console.log("No user logged in");
        setUserData(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.header}>
      {/* Left: Logo */}
      <TouchableOpacity onPress={() => router.push("/donor")}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </TouchableOpacity>

      {/* Center: Title */}
      <Text style={styles.title}>Donor</Text>

      {/* Right: Profile Image */}
      <TouchableOpacity style={styles.profileContainer} onPress={() => router.push("/profile")}>
        {loading ? (
          <View style={styles.profilePlaceholder}>
            <Ionicons name="hourglass-outline" size={24} color="#fff" />
          </View>
        ) : userData?.profileImageUrl ? (
          <Image
            source={{ uri: userData.profileImageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Poppins-Bold",
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderColor: "#FF5F15",
    backgroundColor: "black",
    borderWidth: 2,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  profilePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default DonorHeader;
