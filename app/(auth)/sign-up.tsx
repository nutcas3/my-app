import { StyleSheet, Dimensions, Text, View, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation, useRouter } from "expo-router";
import axios from 'axios';
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { API_URL, useAuth } from "../context/AuthContext";
import {  router } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { onRegister } = useAuth();
  // const navigation = useNavigation();

  useEffect(() => {
    const testCall = async () => {
      const result = await axios.get(`${API_URL}/`);
        console.log(result.data);
    }
    testCall();
    }
    , []);

  const register = async () => {
    const result = await onRegister(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      router.push("/home");
      
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <FormField
            title="Full Name"
            value={fullname}
            otherStyles={styles.formField}
            keyboardType="default"
            placeholder="Full Name"
            handleChangeText={setFullname}
          />
          <FormField
            title="Email"
            value={email}
            otherStyles={styles.formField}
            keyboardType="email-address"
            placeholder="Email Address"
            handleChangeText={setEmail}
          />
          <FormField
            title="Phone Number"
            value={phone}
            otherStyles={styles.formField}
            keyboardType="default"
            placeholder="Phone Number"
            handleChangeText={setPhone}
          />
          <FormField
            title="Password"
            value={password}
            otherStyles={styles.formField}
            placeholder="Password"
            handleChangeText={setPassword}
          />
          <FormField
            title="Repeat Password"
            value={repeatPassword}
            otherStyles={styles.formField}
            placeholder="Repeat Password"
            handleChangeText={setRepeatPassword}
          />
          <CustomButton
            title="Sign Up"
            containerStyles={styles.signUpButton}
            handlePress={register}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Have an account already?</Text>
            <Link href="/sign-in" style={styles.loginLink}>
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: Dimensions.get("window").height - 100,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "700",
    color: "#1F41BB",
    textAlign: "center",
  },
  formField: {
    marginTop: 4,
  },
  signUpButton: {
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 18,
    color: "#000",
    // fontFamily: "pregular",
  },
  loginLink: {
    fontSize: 18,
    // fontFamily: "psemibold",
    color: "#1F41BB",
    marginLeft: 4,
  },
});
