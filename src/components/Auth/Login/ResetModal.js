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
} from "@chakra-ui/react";

const ResetPassword = ({ isOpen, onClose }) => {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded="sm" py="4">
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
