import { Button } from "@chakra-ui/react";
import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgColor?: string;
  padding?: string;
  border?: string;
  hoverBg?: string;
}

const CustomButton: FC<ButtonProps> = ({
  children,
  bgColor = "transparent",
  padding = "1.7rem 2.5rem",
  border = "none",
  hoverBg = "#1f6262",
  ...props
}) => {
  return (
    <Button
      bg={bgColor}
      color={props.color || "white"}
      p={padding}
      border={border}
      _hover={{ bg: hoverBg }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
