import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../Firebase/Config";
import { router } from "expo-router";

export default function Personal() {
  const [userData, setUserData] = useState(null);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
          setNoData(false);
        } else {
          setUserData(null);
          setNoData(true); // 🔥 this will trigger noData UI
        }
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      <View style={styles.avatarWrapper}>
        {/* Optional Avatar */}
      </View>

      {/* ✅ No Data UI Block */}
      {noData && (
        <View style={styles.noDataWrapper}>
          <Ionicons name="alert-circle-outline" size={64} color="#ccc" />
          <Text style={styles.noDataText}>No data found</Text>
          <Text style={styles.noDataSubText}>
            Please complete your profile information.
          </Text>
        </View>
      )}

      {/* ✅ User Data UI Block */}
      {userData && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>@{userData.fullName}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>{userData.fullName}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bbb" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>{userData.contact}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bbb" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Birthday</Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>{userData.birthday}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bbb" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Country</Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>{userData.country}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bbb" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LOGIN INFORMATION</Text>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>{userData.email}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bbb" />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  section: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
    marginLeft: 18,
    marginBottom: 6,
    marginTop: 6,
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    fontSize: 15,
    color: "#888",
    marginRight: 6,
  },
  noDataWrapper: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    width: "90%",
    elevation: 2,
  },
  noDataText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  noDataSubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 6,
    textAlign: "center",
  },
});
