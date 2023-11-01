import { Link, Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import OnTheRiseLogo from "public/images/OnTheRiseLogo.png";
import SearchIcon from "public/images/Search_Icon.png";
import { Allison, Advent_Pro } from "next/font/google";
import { map as _map } from "lodash";

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

export const Header = () => {
  return (
    <>
      <Stack
        sx={{
          background: "#131310",
          height: ["50px", "65px", "75px"],
          position: "sticky",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          zIndex: "1000",
          top: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "25px",
              fontFamily: "Allison",
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              left: "192%",
            }}
          >
            On The Rise
          </div>
        </div>
      </Stack>
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
          }}
        >
          {_map(headerLink, (linkInfo, index) => (
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
                  fontFamily: "Advent Pro",
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
          ))}
          <div style={{ flex: 1 }}></div>
          <Link
            href="/search"
            sx={{
              mx: ["50px", "50px"],
              margin: "auto",
              textDecoration: "none",
              ":hover": {
                textDecoration: "none",
              },
            }}
          >
            <Image src={SearchIcon} alt="Search Icon" style={{ width: "30px", height: "30px" }} />
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
