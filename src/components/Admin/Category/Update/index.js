import React, { useEffect } from "react";
import {
  useToast,
  VStack,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../../../ducks/actions";

const CUpdate = ({ getCategory }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { slug } = useParams();
  const { loading, category } = useSelector((state) => state.categories);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: category && category.name,
    },
  });

  async function onSubmit({ name }) {
    // await createCategory({ toast, name, history });
    reset();
  }

  useEffect(() => {
    slug && getCategory({ toast, slug });
    return () => dispatch({ type: "CATEGORIES_RESET" });
  }, [getCategory, slug, toast, dispatch]);

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
          Update Category
        </Heading>
        {loading ? (
          <h1>Loading</h1>
        ) : (
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
                  UPDATE
                </Button>
              </Flex>
            </VStack>
          </form>
        )}
      </VStack>
    </VStack>
  );
};

export default connect(null, { getCategory })(CUpdate);
