import {
  Box,
  Text,
  useToast,
  useDisclosure,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { CampaignForm } from "./CampaignForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCampaignMutation } from "../../redux/api";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../component/ConfirmModal";

const validateForm = [
  ["campaignName", "startDate", "linkedKeywords", "dailyDigest"],
];
const initialValues = {
  campaignName: "",
  campaignDescription: "",
  startDate: "",
  endDate: "",
  digestCampaign: false,
  linkedKeywords: [],
  dailyDigest: "",
};
type FormInputTypes = {
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  digestCampaign: boolean;
  linkedKeywords: string[];
  dailyDigest: string;
};
const NewCampaign = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormInputTypes>({ mode: "onBlur", defaultValues: initialValues });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const [createCampaign, { isLoading, isSuccess, isError, error }] =
    useCreateCampaignMutation();
  const onSubmit: SubmitHandler<FormInputTypes> = async (data) => {
    try {
      await createCampaign(data).unwrap();
      onOpen();
    } catch (err) {
      let errorMessage =
        "Failed to create campaign. Check your internet connection";
      if (err && typeof err === "object" && "data" in err) {
        errorMessage = `Error: ${JSON.stringify(err.data)}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
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

  return (
    <Box mt={"2rem"} px={{base:"1rem", md:"4rem"}} position="relative">
      <Text color={"#247B7B"} fontWeight={"700"} fontSize={"1.25rem"}>
        Create New Campaign
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
        defaultValues={{}}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
      />
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Campaign Created"
        message="Your campaign was created successfully!"
        actionButtonLabel="Go to Campaigns"
        onActionClick={() => {
          onClose();
          navigate("/");
        }}
      />
    </Box>
  );
};

export default NewCampaign;
