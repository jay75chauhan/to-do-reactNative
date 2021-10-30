import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import * as yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { firebase, db } from "../firebase";
import validUrl from "valid-url";

const SignupFormSchema = yup.object().shape({
  email: yup.string().email().required("A email is required"),
  username: yup.string().required().min(3, "A username is required"),
  profileUrl: yup.string().url(),
  password: yup
    .string()
    .required()
    .min(6, "Your password has to have at least 6 characters"),
});

export default function SignupForm({ navigation }) {
  const auth = firebase.auth();

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, username, profileUrl) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      auth.currentUser.updateProfile({
        displayName: username,
        photoURL: `${profileUrl || (await getRandomProfilePicture())}`,
      });

      db.collection("users")
        .doc(auth.currentUser.email)
        .set({
          owner_uid: auth.currentUser.uid,
          username: username,
          email: auth.currentUser.email,
          profile_picture: `${profileUrl || (await getRandomProfilePicture())}`,
        });
    } catch (error) {
      Alert.alert("ohh 🤷‍♂️ something was wrong...", error.message);
    }
  };

  return (
    <View style={tw`mt-12`}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          profileUrl: "",
        }}
        onSubmit={(value) => {
          onSignup(
            value.email,
            value.password,
            value.username,
            value.profileUrl
          );
        }}
        validationSchema={SignupFormSchema}
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
                1 > values.username.length || values.username.length >= 3
                  ? `border-gray-400`
                  : `border-red-500`
              } p-2 rounded-xl mt-5 mx-5`}
            >
              <TextInput
                style={tw`text-black text-lg ml-2`}
                placeholderTextColor="#6b7280"
                placeholder="UserName"
                autoCapitalize="none"
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
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
            <View
              style={tw`border  ${
                validUrl.isUri(values.profileUrl) ||
                values.profileUrl.length < 3
                  ? `border-gray-400`
                  : `border-red-500`
              } p-2 rounded-xl mt-5 mx-5`}
            >
              <TextInput
                style={tw`text-black text-lg ml-2`}
                placeholderTextColor="#6b7280"
                placeholder="Profile Url"
                textContentType="URL"
                onChangeText={handleChange("profileUrl")}
                onBlur={handleBlur("profileUrl")}
                value={values.profileUrl}
              />
            </View>

            <View style={tw`mt-10 mx-6`}>
              <Button
                title="Sign Up"
                onPress={handleSubmit}
                buttonStyle={tw`${
                  isValid ? `bg-blue-500` : `bg-blue-300`
                } rounded-xl   `}
              />
            </View>
            <View style={tw`flex-row justify-center mt-8`}>
              <Text style={tw`text-gray-500 text-lg`}>
                Already have account?
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={tw`text-blue-500 text-lg`}> Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
