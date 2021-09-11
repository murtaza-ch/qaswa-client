import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import CForm from "./Form";
import RightCol from "./RightCol";

const Login = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} py="20" px={["6", "10", "36"]}>
      <CForm />
      <RightCol />
    </SimpleGrid>
  );
};

export default Login;
