import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import logo from "../assets/images/logo.png";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../Firebase/Config";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 


export default function Index() {

  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState("");
  const [NoUser, setNoUser] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Logged-in UID:", uid);

        try {
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
            console.log("User data:", userSnap.data());
          } else {
            console.log("No such user document found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user is logged in.");
        // setNoUser(true);
      }
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);


  let login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/donor");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setNoUser(true);
      });
  };

  

  return (

    <View style={styles.container}>
    
    
      <View style={styles.loginContainer}>
        {/* Centered Logo */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => login()}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        {NoUser && <Text style={{color:"red",fontSize:16,fontWeight:"bold",marginTop:10}}>No User</Text>}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signUp} onPress={() => router.push("/signup")}>
            Don't have an account? Sign Up
          </Text>
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
  loginContainer: {
    width: "85%",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 140, // ⬅️ Increased size
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
  loginButton: {
    backgroundColor: "#FF5F15",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#FF5F15",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
  signUp: {
    color: "#FF5F15",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
});
