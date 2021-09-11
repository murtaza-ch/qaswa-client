import React from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogoIonic } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Flex
      as="nav"
      w="full"
      justify="space-between"
      align="center"
      px="16"
      py="4"
    >
      <Link
        as={ReactLink}
        _hover={{ color: "brand-orange.500" }}
        textAlign="center"
        py="2"
        to="/"
        variant="outline"
      >
        <IoLogoIonic size={36} />
      </Link>

      <HStack spacing={8}>
        <CLink to="/login" title="Login" />
        <CLink to="/register" title="Register" />
        <Menu offset={[-136, 10]}>
          <MenuButton
            color="gray.900"
            px="0"
            bg="transparent"
            rounded="none"
            as={Button}
            leftIcon={<CgProfile />}
            rightIcon={<IoIosArrowDown />}
            _hover={{
              bg: "transparent",
              transitionDuration: "ultra-slow",
              transitionTimingFunction: "ease",
              borderBottom: "2px",
              borderColor: "brand-orange.400",
            }}
            _active={{
              bg: "transparent",
            }}
          >
            murtaza
          </MenuButton>
          <MenuList
            pos="absolute"
            right="-260"
            role="group"
            shadow="md"
            py="0"
            rounded="none"
          >
            <MenuItem icon={<IoMdLogOut size={20} />} onClick={() => logout()}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;

const CLink = ({ to, title, logo }) => {
  return (
    <Link
      as={ReactLink}
      textAlign="center"
      py="2"
      _hover={{
        bg: "transparent",
        transitionDuration: "ultra-slow",
        transitionTimingFunction: "ease",
        borderBottom: "2px",
        borderColor: "brand-orange.400",
      }}
      to={to}
      variant="outline"
    >
      {title || logo}
    </Link>
  );
};
