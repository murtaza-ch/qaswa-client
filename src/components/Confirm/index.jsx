import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Heading,
  Button,
} from "@chakra-ui/react";

const Confirm = ({
  children,
  handleConfirm,
  isOpen,
  handleClose,
  isLoading,
}) => {
  return (
    <Popover placement="left" isOpen={isOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent
          shadow="lg"
          _focus={{
            boxShadow: "none",
          }}
        >
          <PopoverArrow />
          <PopoverHeader>Confirm!</PopoverHeader>
          <PopoverCloseButton
            onClick={() => handleClose()}
            color="brand.primary.main"
            _focus={{ boxShadow: "none" }}
          />
          <PopoverBody>
            <Heading
              fontSize="md"
              fontWeight="normal"
              color="brand.primary.main"
            >
              Are you sure you want to approve this order?
            </Heading>
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <Button
              variant="outline"
              borderColor="white"
              color="brand.primary.main"
              border="1px"
              onClick={() => handleClose()}
              _focus={{
                offset: 0,
              }}
            >
              No
            </Button>

            <Button
              isLoading={isLoading}
              disabled={isLoading}
              variant="solid"
              ml="2"
              bg="brand.primary.main"
              color="white"
              border="1px"
              borderColor="brand.primary.main"
              onClick={() => handleConfirm()}
              _focus={{
                offset: 0,
              }}
            >
              Yes
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Confirm;
