import React from "react";
import { Box, Text, Heading, VStack, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import bg from "../../../asset/images/registerBg.png";

const RightCol = () => {
  return (
    <Box
      display={["none", "block"]}
      p="8"
      rounded="sm"
      bgImage={`url(${bg})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      w="full"
      h="sm"
    >
      <VStack h="full" justify="space-between" align="flex-start" pr="40">
        <VStack align="flex-start" spacing={12}>
          <Heading color="white" size="md">
            Register
          </Heading>
          <Text color="white" fontSize="sm">
            Create an account to benefit from our exclusive services and keep up
            to date with our latest publications.
          </Text>
        </VStack>
        <Link
          as={ReactLink}
          textAlign="center"
          bg="transparent"
          py="2"
          color="brand-orange.500"
          borderColor="brand-orange.500"
          borderWidth="1px"
          _hover={{
            textDecor: "none",
          }}
          to="/register"
          variant="outline"
          w="full"
          size="md"
          rounded="md"
        >
          Create an account
        </Link>
      </VStack>
    </Box>
  );
};

export default RightCol;
