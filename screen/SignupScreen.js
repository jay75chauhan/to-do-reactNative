import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import SignupForm from "../components/SignupForm";
import LottieView from "lottie-react-native";
export default function SignupScreen({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white  `}>
      <LottieView
        style={tw`h-20 mt-10 self-center `}
        source={require("../assets/animation/done.json")}
        autoPlay
      />
      <View style={tw`items-center mt-10`}>
        <Text style={tw`text-3xl font-semibold italic`}>ToDo App</Text>
      </View>
      <SignupForm navigation={navigation} />
    </View>
  );
}
