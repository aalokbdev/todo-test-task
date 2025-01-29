import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useRouter } from "expo-router";

export default function AuthenticationScreen() {
  const [customOtp, setCustomOtp] = useState(""); // state to store otp data
  const router = useRouter(); // router used here to navigate between screen

  const authenticate = () => {
    if (customOtp) {
      // navigate to TodoList if user enters the otp
      router.replace({
        pathname: "/TodoListScreen",
      });
    } else {
      // Alert will display if users click the authenticate button without entering the otp
      Alert.alert("Authentication Failed", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SECURE TODO APP</Text>

      {/* Input fields to enter otp */}
      <OtpInput
        numberOfDigits={4}
        focusColor="blue"
        autoFocus={true}
        placeholder="****"
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onTextChange={(text) => setCustomOtp(text)}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
        }}
      />

      {/* Button to navigate to TodoListScreen after entering OTP  */}
      <Button title="Authenticate" onPress={authenticate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  otpContainer: {
    justifyContent: "center",
    marginBottom: 50,
  },
  pinCodeContainer: {
    margin: 15,
    borderColor: "#f7f9f9",
    borderWidth: 2,
    backgroundColor: "white",
    width: 60,
    elevation: 5,
  },
  pinCodeText: {
    fontSize: 24,
  },
});
