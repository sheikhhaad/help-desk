import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "../assets/images/logo.png";
import { auth, db } from "../Firebase/Config";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  const signup = async () => {
    if (!role) {
      return;
    }

    if (!fullName || !email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      router.push("/");
    } catch (error) {
      console.log("Error", error.message);
    }

    try {
      const docRef = await addDoc(collection(db, "users"), {
        fullName: fullName,
        email: email,
        password: password,
        role: role,
        createdAt: new Date(),
        phoneNumber: phoneNumber,
        country: country,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        {/* Logo centered above title */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Sign Up</Text>

        {/* Role selection buttons */}
        <View style={styles.roleButtonsRow}>
          <TouchableOpacity
            style={[styles.roleButton, role === "donor" && styles.activeRole]}
            onPress={() => setRole("donor")}
          >
            <Text style={styles.roleButtonText}>Donor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={true}
            style={[styles.roleButton, role === "needy" && styles.activeRole]}
            onPress={() => setRole("needy")}
          >
            <Text style={styles.roleButtonText}>Needy</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#666"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#666"
          value={country}
          onChangeText={(text) => setCountry(text)}
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType="visible-password"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          keyboardType="visible-password"
        />

        <TouchableOpacity style={styles.signupButton} onPress={() => signup()}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    width: "85%",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF5F15",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 13,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#FF5F15",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  roleButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  roleButton: {
    backgroundColor: "#FF5F15",
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activeRole: {
    backgroundColor: "#e85c20",
  },
  roleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginLink: {
    color: "#FF5F15",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
