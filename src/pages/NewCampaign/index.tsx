import { Box, Text, useToast, useDisclosure } from "@chakra-ui/react";
import { AddNewCampaignForm } from "./AddNewCampaignForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCampaignMutation } from "../../redux/api";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../component/ConfirmModal";

const validateForm = [
  [
    "campaignName",
    "campaignDescription",
    "startDate",
    "endDate",
    // "digestCampaign",
    "linkedKeywords",
    "dailyDigest",
  ],
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
      console.log("Submitting campaign data:", JSON.stringify(data, null, 2));
      await createCampaign(data).unwrap();
      onOpen();
    } catch (err) {
      console.error("Error creating campaign:", err);
      let errorMessage = "Failed to create campaign";
      if (err && typeof err === "object" && "data" in err) {
        console.error("Server error response:", err.data);
        errorMessage = `Error: ${JSON.stringify(err.data)}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      //  onOpen("Error", errorMessage);
    }
  };

  return (
    <Box mt={"2rem"} px={"4rem"}>
      <Text color={"#247B7B"} fontWeight={"700"} fontSize={"1.25rem"}>
        Create New Campaign
      </Text>

      <AddNewCampaignForm
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        defaultValues={{}}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
      />
      {isLoading && <Text>Loading...</Text>}
      {isSuccess && <Text color="green">Campaign created successfully!</Text>}
      {isError && (
        <Text color="red">
          Failed to create campaign:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      )}
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
