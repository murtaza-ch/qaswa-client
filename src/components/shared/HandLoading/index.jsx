import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../asset/handLoading.json";

const HandLoading = ({ h, w }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={h} width={w} />;
};

export default HandLoading;
