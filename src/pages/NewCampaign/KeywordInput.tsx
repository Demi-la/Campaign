import React, { useState } from "react";
import { Box, Input, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

interface KeywordInputType {
  onChange: (keywords: string[]) => void;
  initialKeywords?: string[];
}

const KeywordInput: React.FC<KeywordInputType> = ({
  onChange,
  initialKeywords = [],
}) => {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newKeywords = [...keywords, inputValue.trim()];
      setKeywords(newKeywords);
      onChange(newKeywords);
      setInputValue("");
    }
  };

  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
    onChange(newKeywords);
  };

  return (
    <Box>
      <Input
        placeholder="Type and press Enter to add keywords"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        border="1px solid"
        borderColor="#999999"
        padding={"1rem 1rem 3rem 1rem"}
        _placeholder={{
          color: "#999999",
          fontSize: "14px",
          fontWeight: "500",
        }}
      />
      <Box mt={4} display="flex" flexWrap="wrap">
        {keywords.map((keyword, index) => (
          <Tag
            key={index}
            size="md"
            borderRadius="lg"
            variant="solid"
            colorScheme="teal"
            m={1}
            p={"0.6rem 1rem"}
          >
            <TagLabel>{keyword}</TagLabel>
            <TagCloseButton onClick={() => removeKeyword(index)} />
          </Tag>
        ))}
      </Box>
    </Box>
  );
};

export default KeywordInput;
