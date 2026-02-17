import { useState } from "react"
import { AuthContext } from "./AuthContext"
import { auth } from "../../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const registerWithEmail = (eamil, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, eamil, password);
    }

    const loginWithEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const authInfo = {
        loading,
        registerWithEmail,
        user,
        loginWithEmail,
    }
    return <AuthContext value={authInfo}>{children}</AuthContext>
}
export default AuthProvider;