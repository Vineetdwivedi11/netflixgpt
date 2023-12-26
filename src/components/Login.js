import React, { useRef, useState } from 'react';
import Header from './Header';
import {checkvalidData} from '../utils/validate' ;
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
    const [isSignInForm, SetIsSignInForm] = useState(true);
    const [errorMessage, SetErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email  = useRef(null);
    const password = useRef(null);    


   

    const handleButtonClick = () =>{
        // Validate the form data ...
        const message = checkvalidData(email.current.value, password.current.value);
        SetErrorMessage(message);

        if(message) return;
        //  Sign IN / Sign UP Logic
        if (!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((useCredential)=>{
                const user = useCredential.user;
                updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/60192525?v=4"
            }).then(() => {
                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL:photoURL}));
                navigate("/browse")
            }).catch((error) => {
                SetErrorMessage(error.message)
            });
                console.log(user);
               
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                SetErrorMessage(errorCode+"-"+errorMessage)
            });

        }else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate("/browse")
         })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        SetErrorMessage(errorCode+"-"+errorMessage)
  });

        }
    };

    
    

    const toggleSignform =() =>{
        SetIsSignInForm(!isSignInForm);
    };


  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg' 
        alt='logo'
        />
        </div>
        <form  onSubmit={(e)=>e.preventDefault()}className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm? "Sign In":"Sign Up"}</h1>
            {!isSignInForm && <input ref = {name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>}
            <input ref = {email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
            <input ref = {password}type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
            <p className='text-red-600 text-lg'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
            {isSignInForm ? "Sign in":"Sign Up"} 
            </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignform}>
            {isSignInForm? "New to Netflix? Sign Up Now": "Already Registered ? Sign In Now ..."}
            </p>
        </form>
    </div>
  )
}

export default Login;