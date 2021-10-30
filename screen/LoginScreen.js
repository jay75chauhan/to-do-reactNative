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
      <LottieView
        style={tw`h-20 mt-5 self-center `}
        source={require("../assets/animation/done.json")}
        autoPlay
      />
      <KeyboardAvoidingView behavior="padding" style={tw`flex-1`}>
        <View style={tw`items-center mt-3`}>
          <Text style={tw`text-4xl italic`}>ToDo App</Text>
        </View>
        <LoginForm navigation={navigation} />
      </KeyboardAvoidingView>
    </View>
  );
}
