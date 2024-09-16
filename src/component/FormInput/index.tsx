import React from "react";
import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import {
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";

interface FormInputType extends Partial<UseFormRegisterReturn> {
  inputType?: string;
  defaultValue?: string;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  error?: any;
  label?: string;
  options?: { value: string; label: string }[];
  checked?: boolean;
  getValues?: UseFormGetValues<any>;
}

const FormInput: React.FC<FormInputType> = ({
  inputType = "text",
  label,
  defaultValue,
  placeholder,
  error,
  options,
  setValue,
  getValues,
  ...rest
}) => {
  return (
    <FormControl isInvalid={error}>
      <FormLabel color={"#666666"} fontSize={"14px"} fontWeight={"500"}>
        {label}
      </FormLabel>

      {(() => {
        switch (inputType) {
          case "textarea":
            return (
              <Textarea
                defaultValue={defaultValue}
                {...rest}
                onChange={(e) => setValue(rest.name!, e.target.value)}
                placeholder={placeholder}
                border="1px solid"
                borderColor="#999999"
                _placeholder={{
                  color: "#999999",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
            );
          case "select":
            return (
              <ChakraSelect
                defaultValue={defaultValue}
                {...rest}
                onChange={(e) => setValue(rest.name!, e.target.value)}
                border="1px solid"
                borderColor="#999999"
                w={"25%"}
                _placeholder={{
                  color: "#999999",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </ChakraSelect>
            );
          case "date":
            return (
              <Input
                type="date"
                defaultValue={defaultValue}
                {...rest}
                onChange={(e) => setValue(rest.name!, e.target.value)}
                border="1px solid"
                borderColor="#999999"
                _placeholder={{
                  color: "#999999",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
            );
          case "switch":
            return (
              <Switch
                size="md"
                isChecked={Boolean(getValues?.(rest.name!))}
                onChange={() => setValue(rest.name!, !getValues?.(rest.name!))}
                _placeholder={{
                  color: "#999999",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
            );
          case "inputTextArea":
            return (
              <Input
                defaultValue={defaultValue}
                placeholder={placeholder}
                {...rest}
                onChange={(e) => setValue(rest.name!, e.target.value)}
                border="1px solid"
                borderColor="#999999"
                padding={"1rem 1rem 3rem 1rem"}
                _placeholder={{
                  color: "#999999",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
            );
          default:
            return (
              <Input
                defaultValue={defaultValue}
                placeholder={placeholder}
                {...rest}
                onChange={(e) => setValue(rest.name!, e.target.value)}
                border="1px solid"
                borderColor="#999999"
                _placeholder={{
                  color: "#999999",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
            );
        }
      })()}

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
