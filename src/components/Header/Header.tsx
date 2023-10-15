import { Link, Stack } from "@mui/material";
import React from "react";
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
  {
    href: "/about",
    text: "About",
  },
];

export const Header = () => {
  return (
    <Stack
      sx={{
        background: "#1B1B1B",
        height: ["50px", "65px", "75px"],
        borderBottom: "1px solid gold",
        position: "sticky",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
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
            <Link
              href={linkInfo.href}
              sx={{
                mx: ["5px", "25px"],
                textDecoration: "none",
                color: "#DAA520",
                transition: "color 0.3s ease, transform 0.5s ease",
                fontFamily: "Lobster",
                ":hover": {
                  color: "#FFD700",
                  transform: "scale(1.4)",
                },
              }}
            >
              {linkInfo.text}
            </Link>
            {index !== headerLink.length - 1 && "|"}
          </>
        ))}
      </Stack>
    </Stack>
  );
};

export default Header;
