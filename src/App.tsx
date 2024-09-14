import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import Layout from "./component/Layout"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontFamily="'Nunito', sans-serif">
    <Layout/>
    </Box>
  </ChakraProvider>
)
