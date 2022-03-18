import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Heading,
  InputGroup,
  InputRightElement,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";
import { registerComplete } from "../../../ducks/actions";

const CRegisterComplete = ({ registerComplete }) => {
  const history = useHistory();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: localStorage.getItem("email"),
    },
  });

  async function onSubmit({ email, password }) {
    await registerComplete({ email, password, history, toast });
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="full"
      h="calc(100vh - 160px)"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="10">
          <Heading fontSize="xl">Complate Register</Heading>
          <VStack w={["96", "full"]}>
            <FormControl isInvalid={errors.email}>
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
                disabled
                w="sm"
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

            <FormControl isInvalid={errors.password}>
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

              <InputGroup>
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
            w={["96", "full"]}
            size="md"
            rounded="md"
            isLoading={isSubmitting}
            type="submit"
          >
            Complete Register
          </Button>
        </VStack>
      </form>
    </Flex>
  );
};

export default connect(null, { registerComplete })(CRegisterComplete);
