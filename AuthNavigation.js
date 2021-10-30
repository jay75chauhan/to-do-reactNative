import React, { useState, useEffect } from "react";
import { SignedOutStack, SigneInStack } from "./Navigation";
import { firebase } from "./firebase";

export default function AuthNavigation() {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => userHandler(user)),
    []
  );
  return <>{currentUser ? <SigneInStack /> : <SignedOutStack />}</>;
}
