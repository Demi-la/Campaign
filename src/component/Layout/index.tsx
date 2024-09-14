import Nav from './Nav'
import Header from './Header'
import { Outlet } from "react-router";
import { Box, Flex } from '@chakra-ui/react';

const Layout = () => {
  return (
    <>
      <Flex direction="row" minHeight="100vh">
        <Nav />
        <Box flex="1">
          <Header />
          <Box borderBottom="1px solid" borderColor="#F0F4F4" width="100%" />
          <Outlet />
        </Box>
      </Flex>
    </>
  );
}

export default Layout
