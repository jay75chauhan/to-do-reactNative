import React from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import LoginForm from "../components/LoginForm";
import LottieView from "lottie-react-native";
export default function LoginScreen({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white  `}>
      <KeyboardAvoidingView behavior="padding" style={tw`flex-1`}>
        <View style={tw`items-center mt-28`}>
          <Text style={tw`text-4xl italic`}>To Do App</Text>
        </View>
        <LoginForm navigation={navigation} />
        <LottieView
          style={tw`h-40  self-center `}
          source={require("../assets/animation/to.json")}
          autoPlay
        />
      </KeyboardAvoidingView>
    </View>
  );
}
