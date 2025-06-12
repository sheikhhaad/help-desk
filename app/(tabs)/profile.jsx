import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../Firebase/Config";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
      setLoading(false); // ✅ Stop loading once fetch is done (whether user exists or not)
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5F15" />
        <Text style={{ marginTop: 10, color: "#FF5F15" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          {userData?.profileImageUrl ? (
            <Image source={{ uri: userData.profileImageUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}> 
              <Ionicons name="person" size={60} color="#bbb" />
            </View>
          )}
          <TouchableOpacity style={styles.editIcon}>
            <MaterialIcons name="edit" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userData?.fullName || "John Doe"}</Text>
        <Text style={styles.email}>{userData?.email || "john@gmail.com"}</Text>

        {/* Menu */}
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/personalinfo")}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#333"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>My Profile</Text>
            <Entypo
              name="chevron-right"
              size={20}
              color="#333"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons
              name="card-giftcard"
              size={20}
              color="#333"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Donation</Text>
            <Entypo
              name="chevron-right"
              size={20}
              color="#333"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/address")}>
            <Entypo
              name="location-pin"
              size={20}
              color="#333"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>My Address</Text>
            <Entypo
              name="chevron-right"
              size={20}
              color="#333"
              style={styles.chevron}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  card: {
    borderRadius: 20,
    margin: 10,
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  editIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "#222",
  },
  email: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  menu: {
    width: "100%",
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  chevron: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
});
