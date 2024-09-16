import { Box, Flex, Text } from '@chakra-ui/react'
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import SearchInput from '../../component/Search';
import CustomButton from '../../component/Button';

interface CampaignNavType {
  allCount: number;
  inactiveCount: number;
  activeCount: number;
}
const CampaignNav: React.FC<CampaignNavType> = ({
  allCount,
  inactiveCount,
  activeCount,
}) => {
  return (
    <>
      <Box mt={"2rem"}>
        <Text color={"#247B7B"} fontWeight={"600"} fontSize={"1.25rem"}>
          All Campaigns
        </Text>
        <Flex mt={"2rem"} gap={"5rem"}>
          <Flex gap={"1rem"}>
            <CustomButton
              border="1px solid #2A9D8FD1"
              color="#2A9D8FD1"
              padding={"1.2rem 1rem"}
            >
              All ({allCount})
            </CustomButton>
            <CustomButton
              border="1px solid #2A9D8FD1"
              color="#2A9D8FD1"
              padding={"1.2rem 1rem"}
            >
              Inactive ({inactiveCount})
            </CustomButton>
            <CustomButton
              border="1px solid #2A9D8FD1"
              color="#2A9D8FD1"
              padding={"1.2rem 1rem"}
            >
              Active ({activeCount})
            </CustomButton>
          </Flex>
          <Flex gap={"1rem"}>
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
