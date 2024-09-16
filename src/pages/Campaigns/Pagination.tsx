import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

interface PaginationProps {
  table: any; // Adjust the type based on your actual table instance
}

const Pagination: React.FC<PaginationProps> = ({ table }) => {
  const { pageIndex, pageCount } = table.getState().pagination;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.setPageIndex(pageIndex - 1)} // Go to the previous page
      >
        Back
      </Button>

      <Box display="flex" alignItems="center" gap={2}>
        {Array.from({ length: pageCount }).map((_, index) => (
          <Button
            key={index}
            onClick={() => table.setPageIndex(index)}
            variant={pageIndex === index ? "solid" : "outline"}
            borderRadius="full"
            size="sm"
            px={3}
          >
            <Text
              color={pageIndex === index ? "white" : "black"}
              bg={pageIndex === index ? "blue.500" : "transparent"}
              borderRadius="full"
              px={2}
              py={1}
            >
              {index + 1}
            </Text>
          </Button>
        ))}
      </Box>

      <Button
        disabled={!table.getCanNextPage()}
        onClick={() => table.setPageIndex(pageIndex + 1)} // Go to the next page
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
