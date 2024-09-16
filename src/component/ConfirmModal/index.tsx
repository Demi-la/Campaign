import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Box,
} from "@chakra-ui/react";
import CustomButton from "../Button";

interface ConfirmModalType {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionButtonLabel: string;
  onActionClick: () => void;
  secondaryButtonLabel?: string;
  onSecondaryClick?: () => void;
  actionButtonBgColor?: string;
}

const ConfirmModal: React.FC<ConfirmModalType> = ({
  isOpen,
  onClose,
  title,
  message,
  actionButtonLabel,
  onActionClick,
  secondaryButtonLabel,
  onSecondaryClick,
  actionButtonBgColor = "#1f6262",
}) => (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        height={"21.313rem"}
        width={"35.75rem"}
        m={"auto"}
        textAlign={"center"}
      >
        <ModalHeader
          color={"#333333"}
          fontSize={"18px"}
          fontWeight={"600"}
          mt={"3rem"}
        >
          {title}
        </ModalHeader>
        <Box
          borderBottom="1px solid"
          borderColor="#F0F4F4"
          width="80%"
          mx={"auto"}
        ></Box>
        <ModalBody
          color={"#666666"}
          fontSize={"16px"}
          fontWeight={"500"}
          mt={"2rem"}
        >
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter
          display={"flex"}
          gap={"2rem"}
          justifyContent={"center"}
          mb={"2rem"}
        >
          {secondaryButtonLabel && (
            <CustomButton
              onClick={onSecondaryClick}
              border="2px solid #000000"
              color="#000000"
              padding={"1.3rem 2rem"}
            >
              {secondaryButtonLabel}
            </CustomButton>
          )}
          <CustomButton
            onClick={onActionClick}
            bgColor={actionButtonBgColor}
            padding={"1.4rem 1rem"}
          >
            {actionButtonLabel}
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

export default ConfirmModal;
