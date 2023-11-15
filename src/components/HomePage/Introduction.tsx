import { Box, Stack } from "@mui/material";
import React from "react";
import Group from "../../../public/images/ontherisegroup.png";
import Image from "next/image";

export const Introduction = () => {
  return (
    <Stack>
      <Image src={Group} alt="" />
    </Stack>
  );
};

export default Introduction;
