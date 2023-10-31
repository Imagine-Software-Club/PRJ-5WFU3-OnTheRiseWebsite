import { Link, Stack } from "@mui/material";
import React from "react";
import Image from "next/image";
import OnTheRiseLogo from "public/images/OnTheRiseLogo.png";
import SearchIcon from "public/images/Search_Icon.jpg";
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
              position:"relative",
              alignItems: "center",
              justifyContent: "center",
              left: "190%",
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
            fontSize: ["15px", "20px", "25px"],
          }}
        >
          {_map(headerLink, (linkInfo, index) => (
            <>
              {linkInfo.href === "/login" ? (
                <Link
                  href={linkInfo.href}
                  sx={{
                    mx: ["5px", "25px"],
                    marginTop: "-7px",
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "none",
                    },
                    backgroundColor: "rgba(19, 19, 16, 0.9)",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    color: "#FFFFFF",
                  }}
                >
                  <span>{linkInfo.text}</span>
                </Link>
              ) : (
                <Link
                  href={linkInfo.href}
                  sx={{
                    mx: ["5px", "25px"],
                    textDecoration: "none",
                    color: "#FFFFFF",
                    transition: "color 0.3s ease, transform 0.5s ease",
                    fontFamily: "Advent Pro",
                    ":hover": {
                      color: "#FFD700",
                      transform: "scale(1.4)",
                    },
                }}>
                  {linkInfo.text}
                </Link>
              )}
              {index !== headerLink.length - 1}
            </>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
