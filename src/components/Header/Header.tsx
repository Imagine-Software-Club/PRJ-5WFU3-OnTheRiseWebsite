import { Box, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import OnTheRiseLogo from "../../../public/images/OnTheRiseLogo.png";
import Image from "next/image";
import { map as _map } from "lodash";

const headerLink = [
  {
    href: "/upcoming",
    text: "Upcoming",
  },
  {
    href: "/past",
    text: "Past",
  },
  {
    href: "/contact-us",
    text: "Contact Us",
  },
];

export const Header = () => {
  return (
    <Stack
      sx={{
        background: "grey",
        height: "75px",
        borderBottom: "1px solid gold",
        position: "sticky",
        justifyContent: "space-between", // Center horizontally
        alignItems: "center", // Center vertically
        flexDirection: "row",
        zIndex: "1000",
        top: "0",
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          src={OnTheRiseLogo}
          alt="On The Rise Logo"
          height={75}
          width={75}
        />
        <Typography
          sx={{ fontSize: "30px", fontFamily: "Anton", color: "#FFD700" }}
        >
          On The Rise
          <Typography
            component="span"
            sx={{
              color: "darkgreen",
              fontSize: "30px",
              fontFamily: "Anton",
              ml: "5px",
            }}
          >
            MSU
          </Typography>
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        {_map(headerLink, (linkInfo) => (
          <Link
            href={linkInfo.href}
            sx={{
              mx: "10px",
              color: "black",
              textDecoration: "none",
              ":hover": {
                color: "#FFD700",
              },
            }}
          >
            {linkInfo.text}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default Header;
