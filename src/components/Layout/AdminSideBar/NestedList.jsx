import React, { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import NestedListItem from "./NestedListItem";

const NestedList = ({ title, children, icon, items }) => {
  const [show, setShow] = useState(false);

  return (
    <Box w="full">
      <Button
        leftIcon={icon}
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
        onClick={() => setShow(!show)}
      >
        <Text>{title}</Text>
      </Button>
      <VStack
        spacing="1"
        pl="4"
        mt="1.5"
        rounded="xl"
        w="full"
        display={show ? "block" : "none"}
      >
        {items.map(({ title, icon, link }, i) => (
          <NestedListItem key={i} item={title} icon={icon} link={link} />
        ))}
      </VStack>
    </Box>
  );
};

export default NestedList;
