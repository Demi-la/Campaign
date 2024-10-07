import { Box, Flex, Image, List, ListItem, Text } from "@chakra-ui/react";
import logo from "../../assets/svgs/logo.svg";
import { FiPlus } from "react-icons/fi";
import CustomButton from "../Button";
import overviewIcon from "../../assets/svgs/overviewIcon.svg";
import campaignIcon from "../../assets/svgs/campaignIcon.svg";
import market from "../../assets/svgs/market.svg";
import settings from "../../assets/svgs/settings.svg";
import questionMark from "../../assets/svgs/questionMark.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    navigate("/NewCampaign");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      background={"#F0F4F4"}
      paddingY={"1rem"}
      width={{ base: "30%", md: "26%", lg: "26%" }}
      height={"auto"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={{ lg: "center" }}
      gap={{ base: "2rem", lg: "4rem" }}
    >
      <Box>
        <Image
          src={logo}
          alt="Logo"
          width={"16rem"}
          mt={{ base: "2rem", md: "0", lg: "0" }}
        />
      </Box>
      <Box>
        <CustomButton bgColor="#247B7B" onClick={handleNavigate}>
          <Box
            fontWeight={"600"}
            fontSize={"20px"}
            display={"flex"}
            gap={"1rem"}
          >
            <FiPlus style={{ fontSize: "1.5rem" }} />{" "}
            <Text display={{ base: "none", md: "block" }}>New campaign</Text>
          </Box>
        </CustomButton>
        <List
          spacing={"2rem"}
          mt={"3rem"}
          color={"#455454"}
          fontWeight={"500"}
          fontSize={"16px"}
        >
          <Link to={`/Overview`}>
            <ListItem
              display={"flex"}
              alignItems={"center"}
              mt={"2rem"}
              padding={isActive("/Overview") ? "1rem 0rem" : "0"}
              border={isActive("/Overview") ? "2px solid white" : "none"}
              color={isActive("/Overview") ? "#247B7B" : "#455454"}
              borderRadius={"md"}
              backgroundColor={isActive("/Overview") ? "white" : "none"}
            >
              <Flex ml={"2.5rem"}>
                <Image
                  src={overviewIcon}
                  alt="Overview Icon"
                  boxSize="1.5rem"
                  mr={2}
                />
                <Text display={{ base: "none", md: "block" }}>Overview</Text>
              </Flex>
            </ListItem>
          </Link>
          <Link to={`/`}>
            <ListItem
              display={"flex"}
              alignItems={"center"}
              mt={"2rem"}
              padding={isActive("/") ? "1rem 0rem" : "0"}
              border={isActive("/") ? "2px solid white" : "none"}
              color={isActive("/") ? "#247B7B" : "#455454"}
              borderRadius={"md"}
              backgroundColor={isActive("/") ? "white" : "none"}
            >
              <Flex ml={"2.5rem"}>
                <Image
                  src={campaignIcon}
                  alt="Campaign Icon"
                  boxSize="1.5rem"
                  mr={2}
                />
                <Text display={{ base: "none", md: "block" }}>Campaign</Text>
              </Flex>
            </ListItem>
          </Link>

          <ListItem display={"flex"} alignItems={"center"} mt={"2rem"}>
            <Flex ml={"2.5rem"}>
              <Image src={market} alt="Market Icon" boxSize="1.5rem" mr={2} />
              <Text display={{ base: "none", md: "block" }}>
                Market Intelligence
              </Text>
            </Flex>
          </ListItem>

          <ListItem display={"flex"} alignItems={"center"} mt={"2rem"}>
            <Flex ml={"2.5rem"}>
              <Image
                src={settings}
                alt="Settings Icon"
                boxSize="1.5rem"
                mr={2}
              />
              <Text display={{ base: "none", md: "block" }}>
                Account Settings
              </Text>
            </Flex>
          </ListItem>
        </List>
      </Box>
      <Box bg={"white"} width={{base:"88%", lg: "80%"}} height={{base:"20rem ",lg:"16rem"}} textAlign={"center"}>
        <Text
          width={"10%"}
          m={"auto"}
          fontSize={"2rem"}
          color={"#247B7B"}
          mt={"2rem"}
        >
          <Image src={questionMark} alt="Question mark" />
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
          padding={{
            base: "1.3rem 0.7rem",
            md: "1.3rem 2rem",
            lg: "1.3rem 2rem",
          }}
        >
          Get help
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Nav;
