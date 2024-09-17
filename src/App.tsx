import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import Layout from "./component/Layout"
import { Route, Routes } from "react-router";
import Campaigns from "./pages/Campaigns";
import NewCampaign from "./pages/NewCampaign";
import EditCampaign from "./pages/NewCampaign/EditCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import OverView from "./pages/Overview";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontFamily="'Nunito', sans-serif">
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Campaigns />} />
          <Route path="NewCampaign" element={<NewCampaign />} />
          <Route path="EditCampaign/:id" element={<EditCampaign />} />
          <Route path="CampaignDetails/:id" element={<CampaignDetails />} />
          <Route path="Overview" element={<OverView />} />
        </Route>
      </Routes>
    </Box>
  </ChakraProvider>
);
