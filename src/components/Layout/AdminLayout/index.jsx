import React from "react";
import { Flex, VStack, Box } from "@chakra-ui/react";
import AdminSidebar from "../AdminSideBar";
import AdminHeader from "../AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <Flex minH="100vh">
      <VStack
        justifyContent="center"
        flexShrink="0"
        overflow="auto"
        pos="fixed"
        minH="100vh"
        w="300px"
        bg="transparent"
        px="6"
      >
        <AdminSidebar />
      </VStack>
      <Box
        ml={{ base: "0", md: "300px" }}
        pt="6"
        px={{ base: "6", md: 0 }}
        flexGrow="1"
        w="full"
      >
        <AdminHeader />
        <Box pt="24" pb="6" pr={{ base: "0", md: "6" }}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
