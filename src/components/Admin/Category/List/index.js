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
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { useTable } from "react-table";
import { IoAdd } from "react-icons/io5";
import { getCategories, removeCategory } from "../../../../ducks/actions";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../../../ConfirmModal";

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
                  isLoading={slug === cell.row.original.slug && deleteLoading}
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
    []
  );
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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
      {loading && <h1>Loading...</h1>}
      <HStack
        w="full"
        p={{ base: "3", md: "6" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="semibold"
          color="brand-orange.500"
        >
          All Categories
        </Text>
        <Button
          fontSize={{ base: "sm", md: "md" }}
          leftIcon={<IoAdd size={24} />}
          size="md"
          rounded="md"
          onClick={() => history.push("/admin/category/create")}
        >
          CREATE CATEGORY
        </Button>
      </HStack>
      {categories && categories.length > 0 && (
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
      )}
    </Box>
  );
};

export default connect(null, { getCategories, removeCategory })(CList);
