import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { firebase, db } from "../firebase";
export default function AddToDo() {
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    db.collection("users")
      .doc(firebase.auth().currentUser?.email)
      .collection("todos")
      .add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };

  return (
    <View style={tw`flex-row items-center  mt-2 mx-3`}>
      <View style={tw` rounded-2xl  px-3 py-2 flex-1 mr-1 shadow-sm `}>
        <TextInput
          style={tw`text-xl w-full`}
          onChangeText={(text) => setInput(text)}
          value={input}
          placeholder="add your todays ToDo"
          placeholderTextColor="#6b7280"
        />
      </View>
      <TouchableOpacity onPress={addTodo}>
        <Ionicons
          name="add-circle"
          size={40}
          color="black"
          style={tw`shadow-xl`}
        />
      </TouchableOpacity>
    </View>
  );
}
