import React from "react";
import { useHistory } from "react-router-dom";
import { VStack, Heading, HStack, Button, Text } from "@chakra-ui/react";
import { IoBagCheck } from "react-icons/io5";
import NestedList from "./NestedList";
import { HiTemplate, HiViewList, HiOutlineNewspaper } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  RiDashboardLine,
  RiLockPasswordLine,
  RiCoupon4Line,
} from "react-icons/ri";

const categoryItems = [
  {
    title: "List",
    icon: <HiViewList size={20} />,
    link: "/admin/category/list",
  },
  {
    title: "Create",
    icon: <IoCreateOutline size={20} />,
    link: "/admin/category/create",
  },
  {
    title: "Update",
    icon: <HiOutlineNewspaper size={20} />,
    link: "/admin/category/update",
  },
];

const productItems = [
  {
    title: "List",
    icon: <HiViewList size={20} />,
    link: "/admin/product/list",
  },
  {
    title: "Create",
    icon: <IoCreateOutline size={20} />,
    link: "/admin/product/create",
  },
  {
    title: "Update",
    icon: <HiOutlineNewspaper size={20} />,
    link: "/admin/product/update",
  },
];

const AdminSidebar = () => {
  const history = useHistory();

  return (
    <VStack
      display={{ base: "none", md: "block" }}
      p="4"
      shadow="md"
      rounded="lg"
      alignItems="flex-start"
      bg="brand-orange.500"
      w="full"
      minH="calc(100vh - 48px)"
    >
      <HStack color="white">
        <IoBagCheck size={38} />
        <Heading>Qaswa</Heading>
      </HStack>
      <VStack pt="10">
        <Button
          onClick={() => history.push("/admin/dashboard")}
          leftIcon={<RiDashboardLine size={20} />}
          px="3"
          justifyContent="flex-start"
          display="flex"
          rounded="xl"
          _hover={{
            color: "brand-orange.500",
            bg: "white",
          }}
          bg="white"
          color="brand-orange.500"
          w="full"
        >
          <Text>Dashboard</Text>
        </Button>
        <NestedList
          title="Product"
          icon={<AiOutlineShoppingCart size={20} />}
          items={productItems}
        />
        <NestedList
          title="Category"
          icon={<HiTemplate size={20} />}
          items={categoryItems}
        />

        <Button
          leftIcon={<RiCoupon4Line size={20} />}
          px="3"
          justifyContent="flex-start"
          display="flex"
          rounded="xl"
          _hover={{
            color: "brand-orange.500",
            bg: "white",
          }}
          bg="white"
          color="brand-orange.500"
          w="full"
        >
          <Text>Coupon</Text>
        </Button>

        <Button
          leftIcon={<RiLockPasswordLine size={20} />}
          px="3"
          justifyContent="flex-start"
          display="flex"
          rounded="xl"
          _hover={{
            color: "brand-orange.500",
            bg: "white",
          }}
          bg="white"
          color="brand-orange.500"
          w="full"
        >
          <Text>Password</Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export default AdminSidebar;
