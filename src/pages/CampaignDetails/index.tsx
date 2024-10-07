import {
  Box,
  Flex,
  Text,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
  Tag,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { useGetCampaignByIdQuery } from "../../redux/api";
import { Key } from "react";


const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: campaign,
    error,
    isLoading,
  } = useGetCampaignByIdQuery(id as string);
  const toast = useToast();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    toast({
      title: "Error fetching campaign details.",
      description: "There was an issue retrieving the campaign details.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return (
      <Flex justify="center" align="center" height="100vh">
        <Alert status="error">
          <AlertIcon />
          There was an error fetching the campaign details.
        </Alert>
      </Flex>
    );
  }

  if (!campaign) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Alert status="warning">
          <AlertIcon />
          Campaign not found.
        </Alert>
      </Flex>
    );
  }

  return (
    <Box p={5}>
      <Flex justify="space-between" align={{base:"left", lg:"center"}} mb={5} flexDir={{base:"column", md:"row"}}>
        <Text color={"#247B7B"} fontWeight={"700"} fontSize={"1.25rem"}>
           Campaign Details
        </Text>
        <Link to="/">
          <Button colorScheme="teal" mt={{base:"1rem", md:"0"}}>Back to Campaigns</Button>
        </Link>
      </Flex>

      <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Text fontSize="lg" fontWeight="bold">
          Campaign Name:
        </Text>
        <Text mb={4}>{campaign.campaignName}</Text>

        <Text fontSize="lg" fontWeight="bold">
          Campaign Description:
        </Text>
        <Text mb={4}>{campaign.campaignDescription}</Text>

        <Text fontSize="lg" fontWeight="bold">
          Start Date:
        </Text>
        <Text mb={4}>{new Date(campaign.startDate).toLocaleDateString()}</Text>

        <Text fontSize="lg" fontWeight="bold">
          End Date:
        </Text>
        <Text mb={4}>{new Date(campaign.endDate).toLocaleDateString()}</Text>
        <Text fontSize="lg" fontWeight="bold">
          Receive Daily Digest:
        </Text>
        <Text mb={4}>{campaign.digestCampaign}</Text>

        <Text fontSize="lg" fontWeight="bold">
          Status:
        </Text>
        <Text
          mb={4}
          color={campaign.campaignStatus === "ACTIVE" ? "green.500" : "red.500"}
        >
          {campaign.campaignStatus}
        </Text>

        <Text fontSize="lg" fontWeight="bold">
          Linked Keywords:
        </Text>
        <Wrap spacing={4} mb={4}>
          {campaign.linkedKeywords.length > 0 ? (
            campaign.linkedKeywords.map((keyword: string[], index: Key) => (
              <WrapItem key={index}>
                <Tag colorScheme="teal">{keyword}</Tag>
              </WrapItem>
            ))
          ) : (
            <Text>No keywords linked.</Text>
          )}
        </Wrap>

        <Text fontSize="lg" fontWeight="bold">
          Daily Digest:
        </Text>
        <Text mb={4}>{campaign.dailyDigest}</Text>
      </Box>
    </Box>
  );
};

export default CampaignDetails;
