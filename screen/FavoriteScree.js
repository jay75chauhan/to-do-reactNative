import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { firebase, db } from "../firebase";
import LottieView from "lottie-react-native";
import Moment from "react-moment";
export default function FavoriteScree({ navigation }) {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(firebase.auth().currentUser?.email)
      .collection("favorite")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setFavorite(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            favorite: doc.data().favorite,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, [db]);
  return (
    <SafeAreaView style={tw`bg-white flex-1 pt-10`}>
      <View style={tw`flex-row items-center mt-2  mx-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={37} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-2xl mx-20`}>{`${
          firebase.auth().currentUser?.displayName
        } favorite list`}</Text>
      </View>
      <View style={tw`mt-10 mx-4`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {favorite.map((fav) => (
            <View
              key={fav.id}
              style={tw`px-4 flex py-3 rounded-xl shadow-sm bg-gray-50 mb-3`}
            >
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-lg`}>{fav.favorite}</Text>
                <Moment
                  element={Text}
                  className="text-xs text-gray-400"
                  fromNow
                >
                  {fav.timestamp?.toDate()}
                </Moment>
              </View>
            </View>
          ))}

          <LottieView
            style={tw`h-80  self-center `}
            source={require("../assets/animation/end.json")}
            autoPlay
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
