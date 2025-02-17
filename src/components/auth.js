import { useState } from 'react'
import {auth,googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'

export const Auth = ()=>{
  const [email,setEmail] =useState("");
  const [password,setPassword]=useState("")
  const signIn = async()=>{
    try {
      await createUserWithEmailAndPassword(auth,email,password)
    } catch (err) {
      console.error(err)
    }
   
  }
  const signInWithGoogle = async()=>{
    try {
      await signInWithPopup(auth,googleProvider)
    } catch (error) {
      console.error(error)
    }

  }
  const logout = async()=>{
       try {
        await signOut(auth)
       } catch (error) {
        console.error(error)
       }
  }
  return (
    <div>
      <input placeholder="Email..." 
      onChange={(e)=>setEmail(e.target.value)}/>
      <input
       type='password'
       placeholder="Password..."
      onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={signIn}>SignIN</button>
      <button onClick={signInWithGoogle}>Sign  In With Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}