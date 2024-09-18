import {
  Box,
  Flex,
  Spinner,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { CampaignForm } from "./CampaignForm";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useUpdateCampaignMutation,
  useGetCampaignByIdQuery,
} from "../../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import KeywordInput from "./KeywordInput";
import ConfirmModal from "../../component/ConfirmModal";
import { useEffect } from "react";

interface CampaignFormData {
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  digestCampaign: boolean;
  linkedKeywords: string[];
  dailyDigest: string;
  campaignStatus: string;
}

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const { data: campaign, isLoading: isFetching } = useGetCampaignByIdQuery(
    id as string,
    { skip: !id }
  );
  const [updateCampaign, { isLoading, isSuccess, isError, error }] =
    useUpdateCampaignMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<CampaignFormData>({
    mode: "onBlur",
    defaultValues: {
      campaignName: "",
      campaignDescription: "",
      startDate: "",
      endDate: "",
      digestCampaign: false,
      linkedKeywords: [],
      dailyDigest: "",
      campaignStatus: "Inactive",
    },
  });

  useEffect(() => {
    if (campaign) {
      reset({
        campaignName: campaign.campaignName,
        campaignDescription: campaign.campaignDescription,
        startDate: formatDate(campaign?.startDate || ""),
        endDate: formatDate(campaign?.endDate || ""),
        digestCampaign: campaign.digestCampaign,
        linkedKeywords: campaign.linkedKeywords,
        dailyDigest: campaign.dailyDigest,
        campaignStatus: campaign.campaignStatus || "Inactive",
      });
    }
  }, [campaign, reset]);

  const onSubmit: SubmitHandler<CampaignFormData> = async (data) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Campaign ID is not available.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const campaignData = {
      id: parseInt(id),
      campaignName: data.campaignName,
      campaignDescription: data.campaignDescription,
      startDate: formatDate(campaign?.startDate || ""),
      endDate: formatDate(campaign?.endDate || ""),
      digestCampaign:
        data.digestCampaign === true || data.digestCampaign === false
          ? data.digestCampaign
          : false,
      linkedKeywords: data.linkedKeywords,
      dailyDigest: data.dailyDigest,
      campaignStatus: data.campaignStatus,
    };

    try {
      const response = await updateCampaign({
        id,
        data: campaignData,
      }).unwrap();
      
      onOpen();
    } catch (err) {
      let errorMessage = "Failed to update campaign. ";

      if (err && typeof err === "object" && "data" in err) {
        const apiError = err as any;
        if (apiError.data && apiError.data.errors) {
          errorMessage += Object.entries(apiError.data.errors)
            .map(([key, value]) => `${key}: ${(value as string[]).join(", ")}`)
            .join("; ");
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleKeywordsChange = (keywords: string[]) => {
    setValue("linkedKeywords", keywords);
  };
  return (
    <Box mt={"2rem"} px={"4rem"} position={"relative"}>
      <Text color={"#247B7B"} fontWeight={"700"} fontSize={"1.25rem"}>
        Edit Campaign
      </Text>
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(255, 255, 255, 0.8)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="9999"
        >
          <Flex flexDir={"column"} align="center">
            <Spinner size="xl" />
            <Text mt="1rem">Creating Campaign....</Text>
          </Flex>
        </Box>
      )}
      {isSuccess && <Text color="green">Campaign created successfully!</Text>}
      {isError && (
        <Text color="red">
          Failed to create campaign:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      )}
      <CampaignForm
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        defaultValues={campaign}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        isEditMode={true}
      >
        <KeywordInput onChange={handleKeywordsChange} />
      </CampaignForm>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Campaign Created"
        message="Your campaign has been updated successfully!"
        actionButtonLabel="Go to Campaigns"
        onActionClick={() => {
          onClose();
          navigate("/");
        }}
      />
    </Box>
  );
};

export default EditCampaign;
