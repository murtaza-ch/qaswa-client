import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
  Box,
} from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import { auth } from "../../../firebase";

const ResetPassword = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit({ password }) {
    console.log({ password });
    try {
      await auth.currentUser.updatePassword(password);
      reset();
      toast({
        title: "Success",
        description: `Password Update!`,
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    }
  }

  return (
    <VStack>
      <Box w={{ base: "full", md: "96" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Text color="gray.500" textAlign="center" pb="10">
            Update your password here!
          </Text>
          <VStack justify="flex-start" spacing={4}>
            <FormControl isInvalid={errors.password} w={["full"]}>
              <FormLabel
                color={
                  errors.password && errors.password.message
                    ? "brand-orange.600"
                    : "gray.900"
                }
                htmlFor="password"
              >
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  disabled={isSubmitting}
                  type={show ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is Required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    fontSize="xl"
                    bg="transparent"
                    _hover={{
                      bg: "transparent",
                    }}
                    _active={{
                      bg: "transparent",
                    }}
                    color="brand-orange.500"
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? <BiShow /> : <BiHide />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage
                colorScheme="brand-orange"
                bg="brand-orange.50"
                px="2"
                py="0.5"
                rounded="sm"
              >
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w={["full"]}
              size="md"
              rounded="md"
              isLoading={isSubmitting}
              type="submit"
            >
              Update
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
};

export default ResetPassword;
