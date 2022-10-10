import React, { useState } from "react";
import { authService } from "fbase";
import styles from "./AuthForm.module.css";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email"){
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if(newAccount) {
            //create account
            const data = await authService.createUserWithEmailAndPassword(
                email, password);
            console.log(data);
            } else{
            //login
            const data = await authService.signInWithEmailAndPassword(
                email, password);
            console.log(data)
            }
            
        } catch(error){
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);
    return(
    <>
        <form onSubmit={onSubmit} className={styles.container}>
            <input 
                name="email"
                type="text"
                placeholder="Email" 
                required
                value={email}
                onChange={onChange}
                className={styles.authInput} />
            <input 
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
                className={styles.authInput} />
            <input 
                type="submit"
                className={`${styles.authInput} ${styles.authSubmit}`}
                value={newAccount ? "Create Account" : "Sign In"} />
            {error && <span className={styles.authError}>{error}</span>}
        </form>
        <span onClick={toggleAccount} className={styles.authSwitch}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>
    </>
    )
};

export default AuthForm;