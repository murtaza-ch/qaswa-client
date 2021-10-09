import React from "react";
import { HStack, Box, useDisclosure } from "@chakra-ui/react";
import SidebarDrawer from "../AdminSideBar/SidebarDrawer";
import { CgMenuRight } from "react-icons/cg";
import SearchBox from "./SearchBox";

const AdminHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      alignItems="center"
      pos="fixed"
      w={{ base: "calc(100% - 48px)", md: "calc(100% - 328px)" }}
    >
      <SidebarDrawer isOpen={isOpen} onClose={onClose} />
      <HStack
        justifyContent="space-between"
        w="full"
        h="20"
        py="4"
        shadow="md"
        border="1px"
        rounded="lg"
        borderColor="gray.50"
        px="3"
        bg="white"
      >
        <Box>
          <SearchBox />
        </Box>
        <Box
          color="brand-orange.500"
          _hover={{
            color: "brand-orange.300",
          }}
          cursor="pointer"
          display={{ base: "block", md: "none" }}
          onClick={() => onOpen()}
        >
          <CgMenuRight size={32} />
        </Box>
      </HStack>
    </HStack>
  );
};

export default AdminHeader;
