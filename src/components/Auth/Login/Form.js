import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Flex,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import ResetPassword from "./ResetModal";

const CForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <>
      <ResetPassword isOpen={isOpen} onClose={onClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          px={[null, "16"]}
          w="full"
          align="flex-start"
          h="full"
          justify="space-between"
        >
          <Heading>Log In</Heading>
          <VStack w="full">
            <FormControl isInvalid={errors.email} w={["full"]}>
              <FormLabel
                color={
                  errors.email && errors.email.message
                    ? "brand-orange.600"
                    : "gray.900"
                }
                htmlFor="email"
              >
                Email Address
              </FormLabel>

              <Input
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is Required",
                })}
              />
              <FormErrorMessage
                colorScheme="brand-orange"
                bg="brand-orange.50"
                px="2"
                py="0.5"
                rounded="sm"
              >
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} w={["full"]}>
              <Flex justify="space-between" align="center">
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
                <Text
                  onClick={() => onOpen()}
                  _hover={{
                    textDecor: "underline",
                    cursor: "pointer",
                  }}
                  fontSize="xs"
                  color="brand-orange.500"
                >
                  Forgot your password?
                </Text>
              </Flex>
              <InputGroup size="md">
                <Input
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
          </VStack>
          <Button
            w={["full"]}
            size="md"
            rounded="md"
            isLoading={isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default CForm;
