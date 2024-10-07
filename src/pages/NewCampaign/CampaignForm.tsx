import { useState } from "react";
import FormInput from "../../component/FormInput";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Box, Flex, Text } from "@chakra-ui/react";
import CustomButton from "../../component/Button";
import KeywordInput from "./KeywordInput";
import { useNavigate } from "react-router-dom";

interface AddNewCampaignFormType {
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldError>;
  setValue: UseFormSetValue<any>;
  defaultValues?: { [key: string]: any };
  getValues?: UseFormGetValues<any>;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
  onUpdate?: (data: any) => void;
  children?: React.ReactNode;
}

export const CampaignForm: React.FC<AddNewCampaignFormType> = ({
  register,
  errors,
  setValue,
  getValues,
  defaultValues = {},
  onSubmit,
  isEditMode = false,
}) => {

  const [linkedKeywords, setLinkedKeywords] = useState<string[]>([]);

  // Update form value when keywords change
  const handleKeywordsChange = (keywords: string[]) => {
    setLinkedKeywords(keywords);
    setValue("linkedKeywords", keywords);
  };
  const navigate = useNavigate();
  return (
    <form onSubmit={onSubmit}>
      <Box width={{ base: "100%", lg: "80%" }} mt={"1rem"}>
        <Box mb="1.5rem">
          <FormInput
            label="Campaign Name"
            setValue={setValue}
            defaultValue={defaultValues.campaignName}
            error={errors["campaignName"]}
            {...register("campaignName", {
              required: "Campaign name is required",
            })}
            placeholder="e.g The Future is now"
          />
        </Box>

        <Box mb="1.5rem">
          <FormInput
            label="Campaign Description"
            setValue={setValue}
            {...register("campaignDescription", {
              required: "Description is required",
            })}
            defaultValue={defaultValues.campaignDescription}
            placeholder="Please add a description to your campaign"
            error={errors["campaignDescription"]}
            inputType="textarea"
          />
        </Box>

        <Flex gap="1rem" mb="1.5rem" flexDir={{ base: "column", md: "row" }}>
          <FormInput
            label="Start Date"
            setValue={setValue}
            {...register("startDate", {
              required: "Start date is required",
            })}
            placeholder="dd/mm/yyyy"
            defaultValue={defaultValues.startDate}
            error={errors["startDate"]}
            inputType="date"
          />
          <FormInput
            label="End Date"
            setValue={setValue}
            {...register("endDate", {
              required: "End date is required",
            })}
            placeholder="dd/mm/yyyy"
            defaultValue={defaultValues.endDate}
            error={errors["endDate"]}
            inputType="date"
          />
        </Flex>

        <Flex mb="1.5rem" justifyContent={"space-between"}>
          <Text>Want to receive daily digest about the campaign?</Text>
          <Box>
            <FormInput
              getValues={getValues}
              setValue={setValue}
              {...register("digestCampaign")}
              defaultValue={defaultValues.digestCampaign}
              error={errors["digestCampaign"]}
              inputType="switch"
            />
          </Box>
        </Flex>
        <Box mb="1.5rem">
          <Text mb="0.5rem">Linked Keywords</Text>
          <KeywordInput
            onChange={handleKeywordsChange}
            initialKeywords={defaultValues.linkedKeywords || []}
          />
          {/*  KeywordInput */}
          {errors["linkedKeywords"] && (
            <Text color="red.500" fontSize="sm">
              Linked Keywords are required
            </Text>
          )}
        </Box>

        <Box mb="1.5rem" >
          <FormInput
            label="Kindly select how often you want to receive daily digest"
            setValue={setValue}
            {...register("dailyDigest", {
              required: "Required",
            })}
            placeholder="Select"
            defaultValue={defaultValues.dailyDigest}
            error={errors["dailyDigest"]}
            inputType="select"
            options={[
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
            ]}
          />
        </Box>

        <Flex
          gap="1rem"
          mb={"3rem"}
          mt={"3rem"}
          flexDir={{ base: "column", md: "row" }}
        >
          <CustomButton
            type="button"
            border="2px solid #247B7B"
            color="#247B7B"
            padding={"1.3rem 4rem"}
            onClick={() => navigate("/")}
          >
            Cancel
          </CustomButton>
          <CustomButton type="submit" bgColor="#247B7B" padding={"1.4rem 2rem"}>
            {isEditMode ? "Update Campaign" : "Create Campaign"}
          </CustomButton>
        </Flex>
      </Box>
    </form>
  );
};
