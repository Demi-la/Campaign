import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableType {
  columns?: any;
  data?: any;
  onSortingChange?: boolean;
}

const CustomTable: React.FC<TableType> = (props) => {
  const { data, columns } = props;

  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const { pageIndex: newPageIndex, pageSize: newPageSize } = updater(
          table.getState().pagination
        );
        setPageIndex(newPageIndex);
        setPageSize(newPageSize);
      } else {
        setPageIndex(updater.pageIndex ?? pageIndex);
        setPageSize(updater.pageSize ?? pageSize);
      }
    },
  });

  const handleFirstPage = () => {
    if (table.getCanPreviousPage()) {
      table.setPageIndex(0);
    }
  };

  const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  };

  const handleLastPage = () => {
    if (table.getCanNextPage()) {
      table.setPageIndex(table.getPageCount() - 1);
    }
  };

  return (
    <>
      <Box overflowX={{ base: "auto", md: "visible" }}>
        <TableContainer
          mt={{ base: "2rem", lg: "3rem" }}
          minWidth={{ base: "100%", md: "auto" }}
          width={{ base: "max-content", md: "100%" }}
        >
          <Table>
            <Thead
              bg={"#F0F4F4"}
              color={"#455454"}
              borderRadius={"6px"}
              fontWeight={"700"}
              fontSize={"12px"}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: "pointer" }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>

            <Tbody color={"#666666"} fontWeight={"500"} fontSize={"14px"}>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Flex
        mt="2.5rem"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        mb={"1rem"}
      >
        <Button
          onClick={handleFirstPage}
          disabled={!table.getCanPreviousPage()}
          background="#247B7B"
          color="white"
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 2 }}
        >
          First
        </Button>
        <Button
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}
          background="#247B7B"
          color="white"
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 2 }}
        >
          Previous
        </Button>
        <Text mb={{ base: 2, md: 0 }}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <Button
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
          background="#247B7B"
          color="white"
          mb={{ base: 2, md: 0 }}
          ml={{ base: 0, md: 2 }}
        >
          Next
        </Button>
        <Button
          onClick={handleLastPage}
          disabled={!table.getCanNextPage()}
          background="#247B7B"
          color="white"
          mb={{ base: 2, md: 0 }}
          ml={{ base: 0, md: 2 }}
        >
          Last
        </Button>
      </Flex>
    </>
  );
};

export default CustomTable;





