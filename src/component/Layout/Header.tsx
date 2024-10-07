import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import profilePicture from "../../assets/profilePicture.png";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
    <>
      <Box
        position="fixed"
        top="0"
        bg="white"
        zIndex="999"
        width="100%"
        borderBottom="1px solid"
        borderColor="#F0F4F4"
      >
        <Box
          height="7rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={{base:"1.5rem", lg:"4rem"}}
        >
          <Flex gap={"15%"}>
            <Box w={{base:"70%", lg:"40%"}}>
              <Input placeholder="Search for anything" py={"1.5rem"} />
            </Box>

            <Flex w={"40%"} display={{base:"none", lg:"flex"}}>
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
      </Box>
      <Box mt={{base:"7rem", md:"10rem", lg:"10rem"}}></Box>
    </>
  );
};

export default Header;
