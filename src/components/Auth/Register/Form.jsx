import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { sendSignInLinkToEmail } from "../../../ducks/actions";

const CForm = ({ sendSignInLinkToEmail }) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ email }) {
    await sendSignInLinkToEmail({ email, toast });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          px={[null, "16"]}
          w="full"
          align="flex-start"
          h="full"
          spacing="10"
        >
          <Heading>Register</Heading>
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
          </VStack>
          <Button
            w={["full"]}
            size="md"
            rounded="md"
            isLoading={isSubmitting}
            type="submit"
          >
            Register
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default connect(null, { sendSignInLinkToEmail })(CForm);
