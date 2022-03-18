import React from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { auth } from "../../../firebase";

const ResetPassword = ({ isOpen, onClose }) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ email }) {
    const config = {
      url: `${process.env.REACT_APP_FORGOT_PASSWORD_RESET}`,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        toast({
          title: "Password Reset!",
          description: `Password Reset link sent to ${email}`,
          status: "success",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: "Error!",
          description: error.message,
          status: "success",
          duration: 9000,
          position: "top-right",
          isClosable: true,
        });
        onClose();
      });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        rounded="sm"
        py="4"
        pos={["absolute", "relative"]}
        bottom={["-60px", null]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader px="8">Reset password</ModalHeader>
          <ModalCloseButton />
          <ModalBody px="8">
            <VStack justify="flex-start" spacing={10}>
              <Text fontSize="xs" color="gray.700">
                Enter your email address below, and if an account exists, we’ll
                send you a link to reset your password.
              </Text>

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
          </ModalBody>

          <ModalFooter px="8">
            <Button
              w={["full"]}
              size="md"
              rounded="md"
              isLoading={isSubmitting}
              type="submit"
            >
              Reset password
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ResetPassword;
