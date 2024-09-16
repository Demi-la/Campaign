import { Box, Text, useToast } from "@chakra-ui/react";
import { AddNewCampaignForm } from "./AddNewCampaignForm";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useUpdateCampaignMutation,
  useGetCampaignByIdQuery,
} from "../../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import KeywordInput from "./KeywordInput";

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

  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CampaignFormData>({
    mode: "onBlur",
    values: {
      campaignName: campaign ? campaign.campaignName : "",
      campaignDescription: campaign ? campaign.campaignDescription : "",
      startDate: campaign ? campaign.startDate : "",
      endDate: campaign ? campaign.endDate : "",
      digestCampaign: campaign ? campaign.digestCampaign : "",
      linkedKeywords: campaign ? campaign.linkedKeywords || [] : "",
      dailyDigest: campaign ? campaign.dailyDigest : "",
      campaignStatus: campaign ? campaign.campaignStatus || "Inactive" : "",
    },
  });

  const onSubmit: SubmitHandler<CampaignFormData> = async (data) => {
    console.log("Form Data:", data);
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
      startDate: data.startDate,
      endDate: data.endDate,
      digestCampaign: data.digestCampaign,
      linkedKeywords: data.linkedKeywords,
      dailyDigest: data.dailyDigest,
      campaignStatus: data.campaignStatus,
    };
    console.log("Data being sent:", campaignData);

    try {
      console.log("Data being sent:", campaignData);
      const response = await updateCampaign({
        id,
        data: campaignData,
      }).unwrap();
      console.log("Update response:", response);
      toast({
        title: "Campaign updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      console.error("Error updating campaign:", err);
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
    setValue("linkedKeywords", keywords); // To Ensure it works with string[]
  };
  console.log(campaign);
  return (
    <Box mt={"2rem"} px={"4rem"}>
      <Text color={"#247B7B"} fontWeight={"700"} fontSize={"1.25rem"}>
        Edit Campaign
      </Text>
      <AddNewCampaignForm
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
      </AddNewCampaignForm>
      {isFetching && <Text>Loading...</Text>}
      {isSuccess && <Text color="green">Campaign updated successfully!</Text>}
      {isError && (
        <Text color="red">
          Failed to update campaign:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      )}
    </Box>
  );
};

export default EditCampaign;
