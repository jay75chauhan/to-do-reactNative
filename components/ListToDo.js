import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { firebase, db } from "../firebase";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Moment from "react-moment";

export default function ListToDo() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    db.collection("users")
      .doc(firebase.auth().currentUser?.email)
      .collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, [db]);

  const updateTodo = (todo) => {
    db.collection("users")
      .doc(firebase.auth().currentUser?.email)
      .collection("todos")
      .doc(todo.id)
      .set(
        {
          todo: editTodo,
        },
        { merge: true }
      );

    setModalVisible(false);
  };

  const addFavorite = async (todo) => {
    await db
      .collection("users")
      .doc(firebase.auth().currentUser?.email)
      .collection("favorite")
      .add({
        favorite: todo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const edit = (todo) => {
    return (
      <View
        key={todo.id}
        style={[
          tw` w-full h-full justify-end `,
          { backgroundColor: "rgba(0,0,0,0.2)" },
        ]}
      >
        <View style={tw`bg-gray-100 h-40   p-5 shadow-2xl rounded-t-3xl`}>
          <Text style={tw`text-center text-xl border-b border-gray-400 `}>
            Edit your Task
          </Text>
          <View key={todo.id} style={tw`flex-row items-center   mt-8 mx-3`}>
            <View
              key={todo.id}
              style={tw` rounded-2xl  px-3 py-2 flex-1 mr-1 shadow-sm `}
            >
              <TextInput
                style={tw`text-xl w-full`}
                onChangeText={(text) => setEditTodo(text)}
                value={editTodo}
                placeholder={todo.todo}
                placeholderTextColor="#6b7280"
              />
            </View>
            <TouchableOpacity onPress={() => updateTodo(todo)}>
              <Ionicons
                name="add-circle"
                size={40}
                color="black"
                style={tw`shadow-xl`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={tw`mx-5 mt-5`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {todos.map((todo) => (
          <>
            <Modal
              key={todo.id}
              animationType="slide"
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              {edit(todo)}
            </Modal>
            <View
              key={todo.id}
              style={tw`px-4 flex py-3 rounded-xl shadow-sm bg-gray-50 mb-3`}
            >
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-lg`}>{todo.todo}</Text>
                <Moment
                  element={Text}
                  className="text-xs text-gray-400"
                  fromNow
                >
                  {todo.timestamp?.toDate()}
                </Moment>
              </View>
              <View
                style={tw`mt-4  px-4 border-t border-gray-400 flex-row justify-between`}
              >
                <TouchableOpacity
                  style={tw`p-1`}
                  onPress={() => addFavorite(todo.todo)}
                >
                  <Ionicons name="add" size={28} color="green" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`p-1`}
                  onPress={() => setModalVisible(true)}
                >
                  <Feather name="edit-3" size={28} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`p-1`}
                  onPress={(event) =>
                    db
                      .collection("users")
                      .doc(firebase.auth().currentUser?.email)
                      .collection("todos")
                      .doc(todo.id)
                      .delete()
                  }
                >
                  <MaterialIcons name="delete" size={28} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ))}
      </ScrollView>
    </View>
  );
}
