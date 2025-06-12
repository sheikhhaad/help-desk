import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../Firebase/Config";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

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
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/images/avatar-placeholder.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon}>
            <MaterialIcons name="edit" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userData?.name || "John Doe"}</Text>
        <Text style={styles.email}>{userData?.email || "john@gmail.com"}</Text>

        {/* Menu */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={20} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Profile</Text>
            <Entypo name="chevron-right" size={20} color="#333" style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="card-giftcard" size={20} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>Donation</Text>
            <Entypo name="chevron-right" size={20} color="#333" style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Entypo name="location-pin" size={20} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Address</Text>
            <Entypo name="chevron-right" size={20} color="#333" style={styles.chevron} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  menu: {
    width: '100%',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  chevron: {
    marginLeft: 10,
  },
}); 