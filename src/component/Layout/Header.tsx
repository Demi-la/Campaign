import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import profilePicture from "../../assets/profilePicture.png";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
    <>
      <Box
        height="7rem"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={"4rem"}
      >
        <Flex justifyContent={"space-between"}>
          <Box w={"50%"}>
            <Input placeholder="Search for anything" py={"1.5rem"} />
          </Box>

          <Flex>
            <Text fontSize={"2rem"} mt={"0.7rem"}>
              <IoMdNotificationsOutline />
            </Text>
            <Box
              width="1px"
              height={"3rem"}
              bg="#F0F4F4"
              mt={"0.2rem"}
              mx={"0.5rem"}
            />
            <Image src={profilePicture} alt="profile Picture" />
            <Text color={"#333333"} fontWeight={"600"} mt={"1rem"}>
              BigTech
            </Text>
            <Text
              color={"#247B7B"}
              mt={"1rem"}
              fontSize={"1.5rem"}
              ml={"0.3rem"}
            >
              <IoIosArrowDown />
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
