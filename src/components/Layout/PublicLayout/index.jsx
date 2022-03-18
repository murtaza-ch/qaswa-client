import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../Header";

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Box px={["4", "16"]} py="8">
        {children}
      </Box>
    </div>
  );
};

export default PublicLayout;
