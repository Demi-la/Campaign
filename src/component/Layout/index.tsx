import Nav from './Nav'
import Header from './Header'
import { Outlet } from "react-router";
import { Box, Flex } from '@chakra-ui/react';

const Layout = () => {
  return (
    <>
      {/* <Flex direction="row" minHeight="100vh">
        <Nav />
        <Box flex="1">
          <Header />
          <Outlet />
        </Box>
      </Flex> */}
      <Flex direction="row" minHeight="100vh" width="100%">
        <Nav />
        <Flex direction="column" flex="1" overflow="hidden">
          <Header />
          <Box flex="1" overflowX="auto" width="100%">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Layout
