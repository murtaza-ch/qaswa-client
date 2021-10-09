import React from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";

const SearchBox = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        _focus={{
          boxShadow: "none",
        }}
        py="0"
        pr="4.5rem"
        type="text"
        placeholder="Search"
      />
      <InputRightElement roundedRight="md" width="4.5rem">
        <Button
          roundedLeft="none"
          w="full"
          h="full"
          size="sm"
          onClick={() => {}}
        >
          <BiSearchAlt size={24} />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBox;
