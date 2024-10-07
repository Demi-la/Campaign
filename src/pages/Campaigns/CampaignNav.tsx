import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import SearchInput from '../../component/Search';
import CustomButton from '../../component/Button';

interface CampaignNavType {
  allCampaigns: number;
  inactiveCampaigns: number;
  activeCampaigns: number;
}
const CampaignNav: React.FC<CampaignNavType> = ({
  allCampaigns,
  inactiveCampaigns,
  activeCampaigns,
}) => {
  return (
    <>
      <Box mt={"2rem"}>
        <Text color={"#247B7B"} fontWeight={"600"} fontSize={"1.25rem"}>
          All Campaigns
        </Text>
        <Flex mt={"2rem"} gap={"5rem"}>
          <Grid gap={{base:"0.5rem", lg:"1rem"}} gridTemplateColumns={{base:"1fr 1fr", md:"1fr 1fr 1fr"}}>
            <CustomButton
              border="1px solid #2A9D8FD1"
              color="#2A9D8FD1"
              padding={"1.2rem 1rem"}
            >
              All ({allCampaigns})
            </CustomButton>
            <CustomButton
              border="1px solid #2A9D8FD1"
              color="#2A9D8FD1"
              padding={"1.2rem 1rem"}
            >
              Inactive ({inactiveCampaigns})
            </CustomButton>
            <CustomButton
              border="1px solid #2A9D8FD1"
              color="#2A9D8FD1"
              padding={"1.2rem 1rem"}
            >
              Active ({activeCampaigns})
            </CustomButton>
          </Grid>
          <Flex gap={"1rem"} display={{base:"none", lg:"flex"}}>
            <SearchInput
              placeholder="Search for items"
              icon={<IoIosSearch color="gray.500" />}
            />
            <SearchInput
              placeholder="Search for users"
              icon={<IoIosArrowDown color="gray.500" />}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CampaignNav
