import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function BottomTabs() {
  return (
    <View
      style={tw`relative  w-full justify-around  items-center  bottom-0  flex-row  bg-white  px-1  py-3 shadow-xl rounded-t-3xl `}
    >
      <View style={`items-center`}>
        <AntDesign name="checkcircle" size={35} color="black" />
        <Text style={tw`text-center text-xs  `}>Tasks</Text>
      </View>
      <View style={`items-center `}>
        <Ionicons name="md-calendar-sharp" size={35} color="#6b7280" />
        <Text style={tw`text-center text-xs text-gray-500`}>calendar</Text>
      </View>
      <View style={`items-center`}>
        <Ionicons name="md-settings" size={35} color="#6b7280" />
        <Text style={tw`text-center text-xs text-gray-500`}>Tasks</Text>
      </View>
    </View>
  );
}
