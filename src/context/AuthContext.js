import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const {
      user: {uid ,email, displayName, photoURL}
    } = await signInWithPopup(auth, googleProvider);
    
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const docs = await getDocs(q);

      if (docs.docs.length === 0) {
        await setDoc(doc(db, "users", uid), {
          uid,
          displayName,
          email,
          photoURL
        });
  
        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", uid), {});
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};