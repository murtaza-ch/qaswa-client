import React from "react";
import { List, Box, Flex } from "@chakra-ui/react";
import { BiHistory } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import CNavLink from "./NavLink";
import Header from "../Header";

const UserLayout = ({ children }) => {
  return (
    <Box>
      <Header />

      <Flex
        px={["4", "16"]}
        py="8"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box display={{ base: "block", md: "none" }}>
          <List display="flex" overflow="scroll">
            <CNavLink
              to="/user/history"
              title="History"
              leftIcon={<BiHistory size={20} />}
              bottom
            />
            <CNavLink
              to="/user/password"
              title="Password"
              leftIcon={<RiLockPasswordLine size={20} />}
              bottom
            />
            <CNavLink
              to="/user/wishlist"
              title="Wishlist"
              leftIcon={<AiFillHeart size={20} />}
              bottom
            />
          </List>
        </Box>
        <Box display={{ base: "none", md: "block" }} width="40">
          <List>
            <CNavLink
              to="/user/history"
              title="History"
              leftIcon={<BiHistory size={20} />}
            />
            <CNavLink
              to="/user/password"
              title="Password"
              leftIcon={<RiLockPasswordLine size={20} />}
            />
            <CNavLink
              to="/user/wishlist"
              title="Wishlist"
              leftIcon={<AiFillHeart size={20} />}
            />
          </List>
        </Box>
        <Box px={{ base: "0", md: "8" }} w="full">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default UserLayout;
