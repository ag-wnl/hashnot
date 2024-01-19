import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(); // Firebase auth instance

  const login = async (inputs) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      const user = userCredential.user;
      
      //Getting essential user information to cache:
      const userData = await axios.get("http://localhost:8800/api/users/find/" + user.uid)
      
      setCurrentUser({ uid: user.uid, email: user.email, username: userData.data.username, userId: userData.data.id });
      console.log(userData);

    } catch (error) {
      console.error("Firebase Login Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        const userData = await axios.get("http://localhost:8800/api/users/find/" + user.uid);
        const currentUsername = userData.data.username;
        const currentUserId = userData.data.id;

        setCurrentUser({ uid: user.uid, email: user.email, username: currentUsername, userId: currentUserId});
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state change listener on component unmount
    };
  }, [auth]);



  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};