import React from "react";
import { NavLink } from "react-router-dom";
import { chakra, HStack, Text } from "@chakra-ui/react";

const CLink = chakra(NavLink);

const CNavLink = ({ title, to, leftIcon, bottom }) => {
  return bottom ? (
    <CLink
      activeStyle={{
        color: "#e63700",
        borderBottom: "2px solid #e63700",
      }}
      to={to}
      p="2"
      color="gray.500"
      display="block"
      borderColor="gray.500"
      _hover={{
        textDecor: "none",
        bg: "gray.100",
        borderColor: "brand-orange.500",
      }}
    >
      <HStack alignItems="center">
        {leftIcon} <Text>{title}</Text>
      </HStack>
    </CLink>
  ) : (
    <CLink
      activeStyle={{
        color: "#e63700",
        borderRight: "2px solid #e63700",
      }}
      to={to}
      pl="4"
      py="2"
      color="gray.500"
      display="block"
      borderRightWidth="2px"
      borderColor="gray.500"
      _hover={{
        textDecor: "none",
        bg: "gray.100",
        borderColor: "brand-orange.500",
      }}
    >
      <HStack alignItems="center">
        {leftIcon} <Text>{title}</Text>
      </HStack>
    </CLink>
  );
};

export default CNavLink;
