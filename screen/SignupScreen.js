import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import SignupForm from "../components/SignupForm";
import LottieView from "lottie-react-native";
export default function SignupScreen({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white  `}>
      <View style={tw`items-center mt-20`}>
        <Text style={tw`text-3xl font-semibold italic`}>To Do App</Text>
      </View>
      <SignupForm navigation={navigation} />
      <LottieView
        style={tw`h-40  self-center `}
        source={require("../assets/animation/to.json")}
        autoPlay
      />
    </View>
  );
}
