import React from "react";
import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch,
  Select,
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

const FormInput = React.forwardRef<HTMLInputElement, FormInputType>(
  (
    {
      inputType,
      label,
      defaultValue,
      placeholder,
      error,
      options,
      setValue,
      getValues,
      ...rest
    },
    ref
  ) => {
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
                  ref={ref as React.RefObject<HTMLTextAreaElement>}
                  _placeholder={{
                    color: "#999999",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                />
              );
            case "select":
              return (
                <Select
                  defaultValue={defaultValue}
                  {...rest}
                  onChange={(e) => setValue(rest.name!, e.target.value)}
                  placeholder={placeholder}
                  border="1px solid"
                  borderColor="#999999"
                  w={"25%"}
                  ref={ref as React.RefObject<HTMLSelectElement>}
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
                </Select>
              );
            case "date":
              return (
                <Input
                  type="date"
                  defaultValue={defaultValue}
                  {...rest}
                  onChange={(e) =>
                    setValue(rest.name!, e.target.value || false)
                  }
                  border="1px solid"
                  borderColor="#999999"
                  ref={ref as React.RefObject<HTMLInputElement>}
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
                  onChange={() =>
                    setValue(rest.name!, !getValues?.(rest.name!))
                  }
                  ref={ref as React.RefObject<HTMLInputElement>}
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
                  ref={ref}
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
  }
);

export default FormInput;
