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
  useToast,
  Box,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import ResetPassword from "./ResetModal";
import { loginUser, handleGoogleLogin } from "../../../ducks/actions";

const CForm = ({ loginUser, handleGoogleLogin }) => {
  const toast = useToast();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ email, password }) {
    await loginUser({ email, password, history, toast });
  }

  return (
    <Box h="full" px={[null, "16"]}>
      <ResetPassword isOpen={isOpen} onClose={onClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          w="full"
          align="flex-start"
          h="full"
          justify="space-between"
          spacing="10"
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
      <Button
        mt="7"
        onClick={() => handleGoogleLogin({ history, toast })}
        w={["full"]}
        size="md"
        rounded="md"
        type="submit"
        variant="outline"
        rightIcon={<FcGoogle size={24} />}
      >
        Login With
      </Button>
    </Box>
  );
};

export default connect(null, { loginUser, handleGoogleLogin })(CForm);
