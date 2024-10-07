import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Box, Flex, useToast, useDisclosure } from "@chakra-ui/react";
import {
  useDeleteCampaignMutation,
  useGetCampaignByIdQuery,
} from "../../redux/api";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";

interface ActionsProps {
  id: string;
  campaignName: string;
}

const Actions: React.FC<ActionsProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: campaign } = useGetCampaignByIdQuery(id);
  const [deleteCampaign] = useDeleteCampaignMutation();
  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCampaign(id).unwrap();
      setIsDeleteSuccess(true);
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete the campaign",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      onOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    onClose();
    if (isDeleteSuccess) {
      setIsDeleteSuccess(false);
    }
  };

  return (
    <Flex gap={"1rem"}>
      <Link to={`/CampaignDetails/${id}`}>
        <Box>
          <GoEye />
        </Box>
      </Link>
      <Link to={`/EditCampaign/${id}`}>
        <Box>
          <FaRegEdit />
        </Box>
      </Link>

      <Box onClick={onOpen} cursor="pointer">
        <RiDeleteBin6Line />
      </Box>

      <ConfirmModal
        isOpen={isOpen}
        onClose={handleModalClose}
        title={isDeleteSuccess ? "Campaign Deleted" : "Stop Campaign"}
        message={
          isDeleteSuccess
            ? `${campaign?.campaignName} has been deleted successfully.`
            : `Are you sure you want to delete the ${campaign?.campaignName} campaign?`
        }
        actionButtonLabel={
          loading
            ? "Deleting..."
            : isDeleteSuccess
            ? "Go Back to campaign list"
            : "Delete"
        }
        onActionClick={isDeleteSuccess ? handleModalClose : handleDelete}
        secondaryButtonLabel={!isDeleteSuccess ? "Cancel" : undefined}
        onSecondaryClick={!isDeleteSuccess ? onClose : undefined}
        actionButtonBgColor={isDeleteSuccess ? "#247B7B" : "#990000"}
      />
    </Flex>
  );
};

export default Actions;



