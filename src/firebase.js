// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBi6lyJf1Hdrh7oEmB4N30IE7u7byGw-E0",
  authDomain: "netflix-clone-c5046.firebaseapp.com",
  projectId: "netflix-clone-c5046",
  storageBucket: "netflix-clone-c5046.firebasestorage.app",
  messagingSenderId: "897051551473",
  appId: "1:897051551473:web:5b4b03575adb91d8416b50"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name , email , password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user; 
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })

    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

        
    }

}

const logout = () =>{
    signOut(auth);
}
export {auth, db, login, signup, logout};