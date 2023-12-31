import React,{useEffect} from 'react';
import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addUser, removeUser} from "../utils/userSlice"
import {onAuthStateChanged} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import {LOGO} from '../utils/constant';
import { toogleGptSearchView } from '../utils/gptSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user );

    const handleSignOut = () =>{
      signOut(auth).then(() => {
        navigate("/");
      }).catch((error) => {
        navigate("/error");
      });
    }
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(user) => {
        if (user) {
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL:photoURL}))
            navigate("/browse")
          } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
      // Unsubscribe When components Unmounts
      return ()=> unsubscribe();
    },[])

    const handleGptSearchClick = () => {
      // Toggle GPT search
      dispatch(toogleGptSearchView());

    }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img
      className='w-44'
      src={LOGO}
      alt='logo'/>
      {user && <div className='flex p-2'>
        <select className=''>
          <option value="en">English</option>
          <option value="hindi">Hindi</option>
          <option value="spanish">spanish</option> 
         </select>
        <button className='py-2 px-4 mx-2 my-2 bg-purple-800 text-white rounded-lg'
        onClick={handleGptSearchClick}
        >GPT Search</button>

        <img 
        className= 'w-12 h-12 '
        alt='usericon' src={user?.photoURL}/>
        <button onClick={handleSignOut} className='font-bold text-white'>Sign out</button>
      </div>}
    </div>
  )
}

export default Header;