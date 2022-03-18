import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const TableFiler = ({ filter, setFilter }) => {
  return (
    <InputGroup w={{ base: "full", md: "60" }}>
      <InputLeftElement
        color="brand-orange.500"
        pointerEvents="none"
        children={<AiOutlineSearch size={20} />}
      />
      <Input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        w={{ base: "full", md: "60" }}
        _hover={{
          boxShadow: "none",
        }}
        _focus={{
          boxShadow: "none",
        }}
        id="keyword"
        placeholder="Search"
      />
    </InputGroup>
  );
};

export default TableFiler;
