import { Box, Image, List, ListItem, Text } from "@chakra-ui/react";
import logo from "../../assets/svgs/logo.svg";
import { FiPlus } from "react-icons/fi";
import CustomButton from "../Button";
import  overviewIcon from "../../assets/svgs/overviewIcon.svg";
import campaignIcon from "../../assets/svgs/campaignIcon.svg";
import market from "../../assets/svgs/market.svg";
import settings from "../../assets/svgs/settings.svg";
import questionMark from "../../assets/svgs/questionMark.svg";

const Nav = () => {
  return (
    <Box
      background={"#F0F4F4"}
      paddingY={"1rem"}
      width={"27%"}
      height={"auto"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"5rem"}
    >
      <Box>
        <Image src={logo} alt="Logo" width={"16rem"} mt={"1rem"} />
      </Box>
      <Box>
        <CustomButton bgColor="#247B7B">
          <Box
            fontWeight={"600"}
            fontSize={"20px"}
            display={"flex"}
            gap={"1rem"}
          >
            <FiPlus style={{ fontSize: "1.5rem" }} /> New Campaign
          </Box>
        </CustomButton>
        <List
          spacing={"2rem"}
          mt={"3rem"}
          color={"#455454"}
          fontWeight={"500"}
          fontSize={"16px"}
          ml={"2.5rem"}
        >
          <ListItem display={"flex"} alignItems={"center"}>
            <Image
              src={overviewIcon}
              alt="Overview Icon"
              boxSize="1.5rem"
              mr={2}
            />
            Overview
          </ListItem>
          <ListItem display={"flex"} alignItems={"center"}>
            <Image
              src={campaignIcon}
              alt="Campaign Icon"
              boxSize="1.5rem"
              mr={2}
            />
            Campaign
          </ListItem>
          <ListItem display={"flex"} alignItems={"center"}>
            <Image src={market} alt="Market Icon" boxSize="1.5rem" mr={2} />
            Market Intelligence
          </ListItem>
          <ListItem display={"flex"} alignItems={"center"}>
            <Image src={settings} alt="Settings Icon" boxSize="1.5rem" mr={2} />
            Account Settings
          </ListItem>
        </List>
      </Box>
      <Box bg={"white"} width={"80%"} height={"16rem"} textAlign={"center"}>
        <Text
          width={"10%"}
          m={"auto"}
          fontSize={"2rem"}
          color={"#247B7B"}
          mt={"2rem"}
        >
          <Image src={questionMark} alt="Question mark"/>
        </Text>
        <Text
          bgGradient="linear(to-r, #247B7B 20%, #3B247B 100%)"
          bgClip={"text"}
          fontSize={"18px"}
          fontWeight={"600"}
          mt={"0.5rem"}
        >
          Need help?
        </Text>
        <Text
          color={"#666666"}
          fontWeight={"500"}
          width={"80%"}
          m={"auto"}
          mt={"0.5rem"}
          mb={"1.3rem"}
        >
          We’re readily available to provide help{" "}
        </Text>
        <CustomButton
          border="2px solid #247B7B"
          color="#247B7B"
          padding={"1.3rem 2rem"}
        >
          Get help
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Nav;

