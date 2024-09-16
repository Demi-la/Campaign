import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
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
import Pagination from "./Pagination";


interface TableType {
  columns?: any;
  data?: any;
  onSortingChange?: boolean;
}
const CustomTable: React.FC<TableType> = (props) => {
  const { data, columns } = props;

  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState("");

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
    
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
   
  });
  return (
    <>
      <TableContainer mt={"3rem"}>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <div>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
         
        >
          back
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
         
        >
          next
        </button>
      </div>

      {/* <Pagination table={table} /> */}
    </>
  );
};

export default CustomTable;

