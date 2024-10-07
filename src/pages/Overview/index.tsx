import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import calender from "../../assets/svgs/calender.svg";
import exportIcon from "../../assets/svgs/exportIcon.svg";
import OverviewSearch from "../../assets/OverviewSearch.png";
import CustomButton from "../../component/Button";
import { Link } from "react-router-dom";

const OverView = () => {
  return (
    <>
      <Box px={"4rem"}>
        <Flex mt={"2rem"} justifyContent={"space-between"}>
          <Text color={"#247B7B"} fontWeight={"700"} fontSize={"1.5rem"}>
            Overview
          </Text>
          <Flex gap={"1rem"} display={{ base: "none", md: "flex" }}>
            <Flex
              border="1px solid"
              borderColor="#F0F4F4"
              alignItems={"center"}
              fontSize={"12px"}
              fontWeight={"500"}
              px={"1rem"}
              gap={"0.5rem"}
            >
              <Image src={calender} alt="Calender" />
              <Text color={"#333333"}>Date Range</Text>
              <Box width="1px" height={"1rem"} bg="#F0F4F4" mt={"0.2rem"} />
              <Text color={"#666666"}>Nov 1, 2022 - Nov 7, 2022.</Text>
              <Text color={"#247B7B"} fontSize={"1.3rem"} ml={"0.3rem"}>
                <IoIosArrowDown />
              </Text>
            </Flex>
            <Button
              p={"0.5rem 2rem"}
              bgColor={"#F0F4F4"}
              color={"#247B7B"}
              fontWeight={"600"}
              fontSize={"14px"}
            >
              <Image src={exportIcon} alt="Calender" mr={"0.5rem"} />
              Export
            </Button>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Box mt="7rem">
            <Image src={OverviewSearch} alt="Calendar" />
          </Box>

          <Text
            color="#000000"
            fontWeight="600"
            fontSize="14px"
            mt="2rem"
            mb={{ base: "4rem", lg: "2rem" }}
          >
            No activity yet. Create a new campaign to get started
          </Text>

          <Link to={`/NewCampaign`}>
            <CustomButton bgColor="#247B7B">
              <Box
                fontWeight="600"
                fontSize="20px"
                display="flex"
                alignItems="center"
                gap="1rem"
              >
                <FiPlus style={{ fontSize: "1.5rem" }} /> New Campaign
              </Box>
            </CustomButton>
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default OverView;
