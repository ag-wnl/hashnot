import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const auth = getAuth(); // Firebase auth instance

  const login = async (inputs) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      const user = userCredential.user;
      
      //Getting essential user information to cache:
      const userData = await axios.get("http://localhost:8800/api/users/find/" + user.uid)
      
      const token = await user.getIdToken();
      localStorage.setItem('token', token); 
      setToken(token);
      
      setCurrentUser({ uid: user.uid, email: user.email, username: userData.data.username, userId: userData.data.id });
      console.log(userData);

    } catch (error) {
      console.error("Firebase Login Error:", error);
    }
  };

  const signup = async (inputs) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      const user = userCredential.user;

      // Create user data on your backend (replace with your actual API call)
      const userData =  await axios.post("http://localhost:8800/api/auth/register", {
        email: user.email,
        userAccountId: user.uid,
        name: inputs.name,
        username: inputs.username
      });

      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      setToken(token);

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        username: inputs.username, // Assuming username is returned from the API
        userId: "", // Assuming an ID is returned from the API
      });
      console.log("User created successfully:", userData);
    } catch (error) {
      console.error("Firebase Signup Error:", error);
    }
  };

  const logout = async() => {
    try {
      signOut(auth).then(() => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('firebaseUser');
        setToken(null);
        setCurrentUser(null);
      })
    } catch (err) {
      console.error("Firebase Logout Error:", err);
    }

  }

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


  // Adding tokens to request headers to verify user:
  axios.interceptors.request.use(
    config => {
      if (token) {  
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );


  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};