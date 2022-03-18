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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";

const Header = () => {
  const { user } = useSelector((state) => state);
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
      px={["4", "16"]}
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

      <HStack spacing={[3, 8]}>
        {!user && <CLink to="/login" title="Login" />}
        {!user && <CLink to="/register" title="Register" />}
        {user && (
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
              {user.email && user.email.split("@")[0]}
            </MenuButton>

            <MenuList
              pos="absolute"
              right="-260"
              role="group"
              shadow="md"
              py="0"
              rounded="none"
            >
              {user && user.role === "subscriber" && (
                <MenuItem
                  _hover={{
                    color: "white",
                    bg: "brand-orange.500",
                  }}
                  icon={<RiAccountCircleLine size={20} />}
                  onClick={() => history.push("/user/history")}
                >
                  Dashboard
                </MenuItem>
              )}

              {user && user.role === "admin" && (
                <MenuItem
                  _hover={{
                    color: "white",
                    bg: "brand-orange.500",
                  }}
                  icon={<RiAccountCircleLine size={20} />}
                  onClick={() => history.push("/admin/dashboard")}
                >
                  Dashboard
                </MenuItem>
              )}

              <MenuItem
                _hover={{
                  color: "white",
                  bg: "brand-orange.500",
                }}
                icon={<IoMdLogOut size={20} />}
                onClick={() => logout()}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
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
