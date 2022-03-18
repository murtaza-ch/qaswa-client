import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Box,
  useToast,
  Tooltip,
  useDisclosure,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { useTable, useGlobalFilter } from "react-table";
import { IoAdd } from "react-icons/io5";
import { getCategories, removeCategory } from "../../../../ducks/actions";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../../../ConfirmModal";
import TableFilter from "../../../shared/TableFilter";
import HandLoading from "../../../shared/HandLoading";

const CList = ({ getCategories, removeCategory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const [slug, setSlug] = useState("");
  const toast = useToast();
  const { loading, categories, deleteLoading } = useSelector(
    (state) => state.categories
  );

  const data = React.useMemo(
    () => categories && categories.map((c) => ({ name: c.name, slug: c.slug })),
    [categories]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ cell }) => {
          return (
            <HStack>
              <Tooltip
                placement="auto-start"
                hasArrow
                label="Update Category"
                rounded="md"
                bg="brand-orange.600"
              >
                <Link to={`/admin/category/update/${cell.row.original.slug}`}>
                  <FaUserEdit size={24} />
                </Link>
              </Tooltip>

              <Tooltip
                placement="auto"
                hasArrow
                label="Delete Category"
                rounded="md"
                bg="brand-orange.600"
              >
                <Button
                  onClick={() => {
                    setSlug(cell.row.original.slug);
                    onOpen();
                  }}
                  bg="transparent"
                  p="0"
                  color="gray.500"
                  _hover={{ bg: "transparent", color: "gray.400" }}
                  _active={{ bg: "transparent" }}
                >
                  <MdDelete size={24} />
                </Button>
              </Tooltip>
            </HStack>
          );
        },
      },
    ],
    [onOpen]
  );

  const tableInstance = useTable({ columns, data }, useGlobalFilter);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  useEffect(() => {
    getCategories({ toast });
  }, [getCategories, toast]);

  return (
    <Box shadow="md" rounded="lg">
      {slug && isOpen && (
        <ConfirmModal
          title="Confirm!"
          message="Are you sure to delete this category?"
          isLoading={deleteLoading}
          isOpen={isOpen}
          onClose={onClose}
          handleConfirm={() => removeCategory({ toast, slug, onClose })}
        />
      )}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={4}
        w="full"
        p={{ base: "3", md: "6" }}
      >
        <Text
          pt="3"
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="semibold"
          color="brand-orange.500"
        >
          All Categories
        </Text>
        <Flex
          flexDir={{ base: "column-reverse", md: "row" }}
          justifyContent="flex-end"
        >
          <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <Button
            ml={{ base: "0", md: "3" }}
            mb={{ base: "3", md: "0" }}
            fontSize={{ base: "sm", md: "md" }}
            leftIcon={<IoAdd size={24} />}
            size="md"
            rounded="md"
            onClick={() => history.push("/admin/category/create")}
          >
            CREATE
          </Button>
        </Flex>
      </SimpleGrid>
      {loading ? (
        <HandLoading h={300} w={300} />
      ) : (
        categories &&
        categories.length > 0 && (
          <Table {...getTableProps()}>
            <Thead
              roundedTop="2xl"
              boxShadow="rgba(149, 157, 100, 0.13) 0px 8px 24px"
            >
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th color="brand-orange.500" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td color="gray.500" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )
      )}
    </Box>
  );
};

export default connect(null, { getCategories, removeCategory })(CList);
