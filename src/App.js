import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      }
      setUser(signedOutUser);
      console.log(res);
    })
    .catch(err =>{

    })
  }

  const handleSubmit = () => {

  }

  const handleBlur = (e) => { //e = event
    console.log(e.target.name, e.target.value);
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick = {handleSignOut}>Sign out</button> :
        <button onClick = {handleSignIn}>Sign in with Google</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src= {user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onBlur={handleBlur} name="email" id="" placeholder="Email Address" required/>
        <br/>
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
