import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Entypo from "react-native-vector-icons/Entypo";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { firebase } from "../firebase";
export default function HeaderTabs({ navigation }) {
  return (
    <View style={tw`flex-row  items-center  justify-between py-5 px-3`}>
      <TouchableOpacity onPress={() => firebase.auth().signOut()}>
        <AntDesign name="menufold" size={24} color="#6b7280" />
      </TouchableOpacity>

      <SimpleLineIcons name="handbag" size={27} color="#6b7280" />
      <Text style={tw`text-gray-800 text-2xl font-bold mx-5`}>ALL TASKS</Text>
      <Ionicons name="book-outline" size={28} color="#6b7280" />
      <TouchableOpacity onPress={() => navigation.push("FavoriteScree")}>
        <Ionicons name="heart" size={29} color="#fb3958" />
      </TouchableOpacity>
    </View>
  );
}
