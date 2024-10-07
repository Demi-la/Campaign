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
          <Outlet />
        </Box>
      </Flex>
    </>
  );
}

export default Layout
