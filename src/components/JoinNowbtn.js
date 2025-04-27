import React from "react";
import { Button } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";


const goldenShimmer = keyframes`
  0% {
    background-position: -300px 0;
  }
  100% {
    background-position: 300px 0;
  }
`;

const pulseZoom = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const ShimmerButton = styled(Button)({
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(90deg, #1e3c72 25%, #2a5298 50%, #1e3c72 75%)",
  backgroundSize: "400% 100%",
  animation: `${goldenShimmer} 2s infinite linear, ${pulseZoom} 3s infinite ease-in-out`,
  borderRadius: "15px",
  padding: "5px 20px",
  fontWeight: "bold",
  fontSize: "1.2rem",
  textTransform: "none",
  color: "white",
  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  "&:hover": {
    animation: `${pulseZoom} 2s infinite`,
    backgroundSize: "400% 100%",
    // boxShadow: "0 10px 40px rgba(191, 160, 70, 0.8)",
  },
});

export default function JoinNowButton() {
  return (
    <>
      <ShimmerButton startIcon={<RocketLaunchIcon/>} variant="contained">Join Now</ShimmerButton>
    </>
  );
}
