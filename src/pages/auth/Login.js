import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import Card from '../../components/card/Card';
import { auth } from "../../firebase/config";

import Loader from '../../components/loader/Loader';
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
  } from "firebase/auth";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {selectPreviousURL, SAVE_URL } from '../../redux/slice/CartSlice';

const Login = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPasword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const previousURL=useSelector(selectPreviousURL)
    const navigate=useNavigate()
    const loginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                
                const user = userCredential.user;
                setIsLoading(false)
               
                toast.success("Login Successfull.. ")
               redirectUser()
               

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoading(false)
                toast.error(error.message)
            });
    }
    const redirectUser =()=>{
        console.log("Sgdfdf")
        if (previousURL.includes("cart")){
            return navigate("/cart")

        }
        navigate("/")
    }


    // Login With Google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle=() =>{
        signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    toast.success("Login Succcesfull...")
    redirectUser('/')
  }).catch((error) => {
    // Handle Errors here.
    toast.error(error.message)
    
    // ...
  });

        

    }
    return (
        <>
        {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} alt="Login" width="400" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={loginUser}>
                        <input type="text" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPasword(e.target.value)} />

                        <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>

                        <div className={styles.links}>
                            <Link to='/reset'>Reset Password</Link>
                        </div>

                        <p>-- or  -- </p>
                    </form>
                    <button
                        className="--btn --btn-danger --btn-block"

                        onClick={signInWithGoogle}

                    >
                        <FaGoogle color="#fff" /> Login With Google
                    </button>
                    <span className={styles.register}>
                        <p>Don't have an account?</p>
                        <Link to="/register">Register</Link>
                    </span>
                </div>
            </Card>
        </section>
        </>
    )
}

export default Login