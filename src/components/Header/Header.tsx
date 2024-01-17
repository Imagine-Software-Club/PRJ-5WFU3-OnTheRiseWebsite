"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import OnTheRiseLogo from "../../../public/images/OnTheRiseLogo.png";
import { Allison, Advent_Pro } from "next/font/google";
import { map as _map } from "lodash";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDN1I86mQrlp0BxQC5KF7gtYwqDlCz6ZQs",
  authDomain: "otrwebsite-cf4d6.firebaseapp.com",
  projectId: "otrwebsite-cf4d6",
  storageBucket: "otrwebsite-cf4d6.appspot.com",
  messagingSenderId: "933001896271",
  appId: "1:933001896271:web:1abf3e97f61126776a653a",
  measurementId: "G-9JRVNRGMLY"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const allison = Allison({
  weight: ["400"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin", "latin-ext", "vietnamese"],
});

const advent_pro = Advent_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
});

const headerLink = [
  {
    href: "/about",
    text: "About Us",
  },
  {
    href: "/events",
    text: "Events",
  },
  {
    href: "/calendar",
    text: "Calendar",
  },
  {
    href: "/members",
    text: "Members",
  },
  {
    href: "/services",
    text: "Services",
  },
  {
    href: "/contact-us",
    text: "Contact Us",
  },
  {
    href: "/login",
    text: "Log In",
  },
];

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open:any) => () => {
    setIsDrawerOpen(open);
  };

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
        } else {
          console.log("user is logged out")
        }
      });
     
}, [])

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "#131310",
          height: ["50px", "65px", "75px"],
          flexDirection: "row",
          alignItems: "center",
          zIndex: "1000",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{
              marginRight: "2",
              display: ["flex", "none"], // Show only on smaller screens
            }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button href="/">
              <Image
                src={OnTheRiseLogo}
                alt=""
                style={{
                  width: "73px",
                  height: "73px",
                  objectFit: "fill",
                  margin: "20px",
                }}
              />
            </Button>
            <Typography
              component={Link}
              href="/"
              sx={{
                color: "#FFFFFF",
                fontSize: "25px",
                fontFamily: allison.style.fontFamily,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              On The Rise
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {_map(headerLink, (linkInfo, index) => (
            <ListItem key={index}>
              <Link
                href={linkInfo.href}
                color="inherit"
                sx={{ textDecoration: "none", color: "#000000" }}
                onClick={toggleDrawer(false)}
              >
                {linkInfo.text}
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Stack
        sx={{
          background: "#1B1B1B",
          height: ["50px", "65px", "75px"],
          position: "sticky",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          zIndex: "1000",
          top: "0",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            color: "#DAA520",
            fontSize: ["14px", "16px", "18px"],
            fontWeight: "normal",
            textAlign: "center",
            justifyContent: "center",
            display: ["none", "flex"],
          }}
        >
          {_map(headerLink, (linkInfo, index) =>
            linkInfo.href === "/login" ? (
              <Link
                key={linkInfo.href}
                href={linkInfo.href}
                sx={{
                  mx: ["50px", "50px"],
                  marginTop: ["-5px", "-5px"],
                  textDecoration: "none",
                  backgroundColor: "rgba(19, 19, 16, 0.9)",
                  width: "75px",
                  height: "15px",
                  borderRadius: "5px",
                  padding: "10px 10px",
                  color: "#FFFFFF",
                  transition: "background-color 0.3s, transform 0.3s",
                  ":hover": {
                    backgroundColor: "#FFD700",
                  },
                }}
              >
                {linkInfo.text}
              </Link>
            ) : linkInfo.text === "Log In" ? (
              <Link
                key={linkInfo.href}
                href={linkInfo.href}
                sx={{
                  mx: ["15px", "5px"],
                  position: "sticky",
                  textDecoration: "none",
                  color: "#FFFFFF",
                  transition: "color 0.3s ease, transform 0.5s ease",
                  fontFamily: advent_pro.style.fontFamily,
                  fontSize: "2px",
                  ":hover": {
                    color: "#FFD700",
                    transform: "scale(1.1)",
                  },
                }}
              >
                {linkInfo.text}
              </Link>
            ) : (
              <Link
                key={linkInfo.href}
                href={linkInfo.href}
                sx={{
                  mx: ["50px", "50px"],
                  marginTop: "3px",
                  textDecoration: "none",
                  color: "#FFFFFF",
                  transition: "color 0.3s ease",
                  ":hover": {
                    color: "#FFD700",
                  },
                }}
              >
                {linkInfo.text}
              </Link>
            )
          )}
          <div style={{ flex: 1 }}></div>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
