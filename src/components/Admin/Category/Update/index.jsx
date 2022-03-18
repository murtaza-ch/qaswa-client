import React, { useEffect } from "react";
import {
  useToast,
  VStack,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useSelector, useDispatch } from "react-redux";
import { getCategory, updateCategory } from "../../../../ducks/actions";
import HandLoading from "../../../shared/HandLoading";

const CUpdate = ({ getCategory, updateCategory }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();
  const { slug } = useParams();
  const { loading, category } = useSelector((state) => state.categories);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  async function onSubmit({ name }) {
    await updateCategory({ toast, slug, name, history });
  }

  useEffect(() => {
    slug && getCategory({ toast, slug });
    return () => dispatch({ type: "CATEGORIES_RESET" });
  }, [getCategory, slug, toast, dispatch]);

  useEffect(() => {
    category && setValue("name", category.name);
  }, [category, setValue]);

  return (
    <VStack py="10">
      <VStack
        alignItems="flex-start"
        shadow="md"
        width={{ base: "full", md: "500px" }}
        p="4"
        rounded="xl"
        spacing="10"
      >
        <HStack justifyContent="space-between" w="full">
          <Heading color="gray.400" fontSize="xl">
            Update Category
          </Heading>
          <Text color="brand-orange.500">
            <Link to="/admin/category/list">View</Link>
          </Text>
        </HStack>
        {loading ? (
          <HandLoading h={200} w={200} />
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

export default connect(null, { getCategory, updateCategory })(CUpdate);
