import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import AddToDo from "../components/AddToDo";
import BottomTabs from "../components/BottomTabs";
import HeaderTabs from "../components/HeaderTabs";
import ListToDo from "../components/ListToDo";
import { firebase } from "../firebase";
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={tw`bg-white flex-1 pt-10`}>
      <HeaderTabs navigation={navigation} />
      <View style={tw`flex-row items-center mx-2 p-3`}>
        <Image
          source={{ uri: firebase.auth().currentUser?.photoURL }}
          style={tw`rounded-full w-12 h-12`}
        />
        <Text style={tw`text-2xl font-bold ml-3`}>{`Hii ${
          firebase.auth().currentUser?.displayName
        }......`}</Text>
      </View>

      <View style={tw`flex-1`}>
        <AddToDo />
        <ListToDo />
      </View>

      <BottomTabs />
    </SafeAreaView>
  );
}
