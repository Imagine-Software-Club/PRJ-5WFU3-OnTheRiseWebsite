"use client";
import { Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Acme } from "next/font/google";
import InstagramIcon from "../../../public/instagram.svg";
import gmailIcon from "../../../public/google-gmail.svg";
import phoneIcon from "../../../public/alternate-phone-square.svg";
import _map from "lodash/map";

interface IContactUs {}

const acme = Acme({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

type contact = {
  icon: any;
  text: string;
};

const contactInfo: Array<contact> = [
  {
    icon: InstagramIcon,
    text: "ontherise_ent",
  },
  {
    icon: gmailIcon,
    text: "ontherise.ent.msu@gmail.com",
  },
  {
    icon: phoneIcon,
    text: "Arthur Marlowe (community service chair): 231-730-9089",
  },
];

const ContactUs: React.FC<IContactUs> = () => {
  return (
    <Stack
      sx={{
        borderTop: "2px solid black",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "40px", fontFamily: acme.style.fontFamily }}>
        Contact Us
      </Typography>
      <Stack
        sx={{
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {_map(contactInfo, (contacts: contact) => (
          <Stack sx={{ alignItems: "center", flexDirection: "row", mb: "3%" }}>
            <Image
              src={contacts.icon}
              alt=""
              style={{ width: "60px", height: "auto" }}
            />
            <Typography
              sx={{
                fontSize: ["18px", "24px"],
                ml: "2%",
                fontFamily: acme.style.fontFamily,
              }}
            >
              {contacts.text}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ContactUs;
