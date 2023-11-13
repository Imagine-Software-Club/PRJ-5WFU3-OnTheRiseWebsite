import { Box } from "@mui/material";
import React from "react";
import OurMissionImage from "../../../public/images/OurMissionImage.jpg";
import Image from "next/image";

interface IOurMission {}

export const ImageSection: React.FC = () => {
  return (
    <Box>
      <Image
          src={OurMissionImage}
          alt="OurMission"
          style={{
              width: "auto",
              height: "auto",
              objectFit: "fill",
          }}
      />
    </Box>
  );
};

export const IntroductionText: React.FC = () => {
  return (
    <Box>
      <p>Welcome To OnTheRise Entertainment. Join us and hang out with THE BEST ORG ON CAMP!
          We have lots of things planned for this school year, and we want you to be a part of it!
          ALL are welcome. See you soon!</p>
    </Box>
  );
};

export const OurMission: React.FC<IOurMission> = () => {
  return (
      <div>
      <ImageSection />
      <IntroductionText />
    <Box>
      <p>A community service based organization centered around development, leadership, and entertainment.
          We aim to provide social, cultural, and service oriented programs for students at
          Michigan State University.</p>
    </Box>
      </div>
  );
};

export default OurMission;

