import { InputGroup, InputRightElement, Input, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SearchInputProps {
  placeholder?: string;
  icon?: ReactNode;
}

const SearchInput = ({ placeholder = "Search...", icon }: SearchInputProps) => {
  return (
    <InputGroup>
      <Input
        type="text"
        placeholder={placeholder}
        borderColor="gray.300"
        padding={"1.2rem 1rem"}
        _focus={{ borderColor: "teal.500", boxShadow: "none" }}
      />
      <InputRightElement pointerEvents="none">{icon}</InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
