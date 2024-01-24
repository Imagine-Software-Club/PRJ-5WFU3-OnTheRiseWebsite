"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import OnTheRiseLogo from "../../../public/images/OnTheRiseLogo.png";
import { Allison, Advent_Pro } from "next/font/google";
import { map as _map } from "lodash";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';


import dotenv from 'dotenv';
dotenv.config();

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open:any) => () => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        console.log(process.env.REACT_APP_apiKey);

        const firebaseConfig = {
          apiKey: process.env.REACT_APP_apiKey,
          authDomain: process.env.REACT_APP_authDomain,
          projectId: process.env.REACT_APP_projectId,
          storageBucket: process.env.REACT_APP_storageBucket,
          messagingSenderId: process.env.REACT_APP_messagingSenderId,
          appId: process.env.REACT_APP_appId,
          measurementId: process.env.REACT_APP_measurementId
        };

        // Initialize Firebase app
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            console.log("uid", uid);
          } else {
            console.log("user is logged out");
          }
        });
      } catch (error) {
        console.error("Error initializing Firebase:", error);
      }
    };

    initializeFirebase();
  }, []);

  // ... (rest of your code)

  return (
    <>
      {/* ... (rest of your JSX) */}
    </>
  );
};

export default Header;
