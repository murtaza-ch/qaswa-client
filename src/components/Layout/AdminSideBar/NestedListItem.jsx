import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

const NestedListItem = ({ item, link, icon }) => {
  const history = useHistory();

  return (
    <Button
      onClick={() => history.push(link)}
      leftIcon={icon}
      display="flex"
      justifyContent="flex-start"
      w="full"
      rounded="xl"
      px="3"
      py="1"
      bg="white"
      color="brand-orange.400"
      _hover={{
        bg: "white",
        color: "brand-orange.500",
      }}
    >
      <Text>{item}</Text>
    </Button>
  );
};

export default NestedListItem;
