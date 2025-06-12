import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../Firebase/Config";
import logo from "../assets/images/logo.png";
import { router } from "expo-router";

export default function Signup() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!image) return null;

    const data = new FormData();
    data.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "profile.jpg",
    });
    data.append("upload_preset", "react-native");
    data.append("cloud_name", "do8y0zgci");
  

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const signup = async () => {
    if (!role || !fullName || !email || !password || !confirmPassword) {
      console.log("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match.");
      return;
    }

    setUploading(true);
    const imageUrl = await uploadImageToCloudinary();
    setUploading(false);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        contact,
        country,
        role,
        profileImageUrl: imageUrl || null,
        createdAt: new Date(),
      });

      console.log("User registered and data saved.");
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.signupContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Sign Up</Text>

            {/* Role Buttons */}
            <View style={styles.roleButtonsRow}>
              <TouchableOpacity
                style={[styles.roleButton, role === "donor" && styles.activeRole]}
                onPress={() => setRole("donor")}
              >
                <Text style={styles.roleButtonText}>Donor</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleButton, role === "needy" && styles.activeRole]}
                onPress={() => setRole("needy")}
              >
                <Text style={styles.roleButtonText}>Needy</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={pickImage}>
              <View style={styles.imagePicker}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <Text style={{ color: "#666" }}>Pick Profile Image</Text>
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={[styles.signupButton, uploading && { backgroundColor: "#ccc" }]}
              onPress={signup}
              disabled={uploading}
            >
              <Text style={styles.signupButtonText}>
                {uploading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.loginLink}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  imagePicker: {
    width: 100,
    height: 100,
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});
