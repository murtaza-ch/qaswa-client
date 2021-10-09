import React from "react";
import { useHistory } from "react-router-dom";
import {
  VStack,
  Heading,
  useToast,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createCategory } from "../../../../ducks/actions";

const CCreate = () => {
  const history = useHistory();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit({ name }) {
    await createCategory({ toast, name, history });
    reset();
  }

  return (
    <VStack py="10">
      <VStack
        alignItems="flex-start"
        shadow="md"
        width={{ base: "full", md: "500px" }}
        p="4"
        rounded="xl"
        spacing="6"
      >
        <Heading color="gray.400" fontSize="xl">
          Create Category
        </Heading>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <VStack w="full">
            <FormControl isInvalid={errors.name} w={["full"]}>
              <Input
                _hover={{
                  boxShadow: "none",
                }}
                id="name"
                placeholder="Category Name..."
                {...register("name", {
                  required: "Category Name is Required",
                })}
              />
              <FormErrorMessage
                colorScheme="brand-orange"
                bg="brand-orange.50"
                px="2"
                py="0.5"
                rounded="sm"
              >
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="flex-end" w="full">
              <Button
                size="md"
                rounded="md"
                isLoading={isSubmitting}
                type="submit"
              >
                CREATE
              </Button>
            </Flex>
          </VStack>
        </form>
      </VStack>
    </VStack>
  );
};

export default CCreate;
