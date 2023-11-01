import { Box } from "@mui/material";
import React from "react";
import MemberCard from "../../src/components/Cards/MemberCard";

interface IEventsHome {}

export const MembersPage: React.FC<IEventsHome> = () => {
  var cards = [];

  for (let i = 1; i <= 20; i++) {
    cards.push(<MemberCard key={i} />);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="20px"
    >
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        maxWidth="1200px"
        gap={20}
      >
        {cards}
      </Box>
    </Box>
  );
};

export default MembersPage;
