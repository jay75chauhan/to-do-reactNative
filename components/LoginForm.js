import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import * as yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { firebase } from "../firebase";

const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required("A email is required"),
  password: yup
    .string()
    .required()
    .min(6, "Your password has to have at least 8 characters"),
});

export default function LoginForm({ navigation }) {
  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("login firebase");
    } catch (e) {
      Alert.alert(
        "ohh 🤷‍♂️ ...something was wrong",
        e.message +
          "\n\n... What would you like to do next 👀 !?"[
            {
              text: "ok",
              onPress: () => console.log("OK"),
              style: "cancel",
            }
            // {

            //   text: "Sign Up",
            //   onPress: () => navigation.push("SignupScreen"),
            // }
          ]
      );
    }
  };

  return (
    <View style={tw`mt-16`}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value) => {
          onLogin(value.email, value.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleBlur, handleSubmit, handleChange, values, isValid }) => (
          <>
            <View
              style={tw`border  ${
                values.email.length < 1 || Validator.validate(values.email)
                  ? `border-gray-400`
                  : `border-red-500`
              } p-2 rounded-xl mx-5`}
            >
              <TextInput
                style={tw`text-black text-lg ml-2`}
                placeholderTextColor="#6b7280"
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={tw`border  ${
                1 > values.password.length || values.password.length >= 6
                  ? `border-gray-400`
                  : `border-red-500`
              } p-2 rounded-xl mt-5 mx-5`}
            >
              <TextInput
                style={tw`text-black text-lg ml-2`}
                placeholderTextColor="#6b7280"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View style={tw`items-end p-2 mr-5 `}>
              <Text style={tw`text-blue-400`}>Forgot Password?</Text>
            </View>
            <View style={tw`mt-6 mx-6`}>
              <Button
                title="Log in"
                onPress={handleSubmit}
                buttonStyle={tw`${
                  isValid ? `bg-blue-500` : `bg-blue-300`
                } rounded-xl   `}
              />
            </View>
            <View style={tw`flex-row justify-center mt-8`}>
              <Text style={tw`text-gray-500 text-lg`}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={tw`text-blue-500 text-lg`}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
