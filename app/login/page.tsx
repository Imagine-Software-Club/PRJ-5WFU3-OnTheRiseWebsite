"use client";

import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Basic HTML and inline styles
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);

      // You can perform additional actions after successful login

    } catch (err) {
      setError(`Username or Password is incorrect`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      // You can perform additional actions after successful sign-out
      window.location.reload();

    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const loggedIn = Boolean(auth.currentUser);

  return (
    <div>
      <br />
      <br />
    
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Form</h2>
      {loggedIn ? (
        <center>
          <button style={{ padding: '10px', backgroundColor: '#4caf50', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '4px', transition: 'background-color 0.3s' }} onClick={handleSignOut}>Sign Out</button>
        </center>
      ) : (
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleLogin}>
          <label style={{ marginBottom: '8px' }} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', marginBottom: '16px' }}
          />

          <label style={{ marginBottom: '8px' }} htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '8px', marginBottom: '16px' }}
          />

          <button style={{ padding: '10px', backgroundColor: '#4caf50', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '4px', transition: 'background-color 0.3s' }} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
    </div>
  );
};

export default LoginForm;
