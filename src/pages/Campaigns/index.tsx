import { Box, Flex, Spinner, Text } from "@chakra-ui/react"
import CampaignNav from "./CampaignNav"
import { useGetCampaignQuery } from "../../redux/api";
import CustomTable from "./Table";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../../component/Actions";



const Campaigns = () => {
    const { data: campaign = [], error, isLoading } = useGetCampaignQuery();
     const allCampaigns = campaign.length;
     const inactiveCampaigns= campaign.filter(
       (campaign: { campaignStatus: string }) =>
         campaign.campaignStatus === "Inactive"
     ).length;
     const activeCampaigns = campaign.filter(
       (campaign: { campaignStatus: string }) =>
         campaign.campaignStatus === "Active"
     ).length;
    if (isLoading) {
      return (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" />
        </Flex>
      );
    }
     if (error) return <Text>Error loading campaigns</Text>;
    
    const campaignColumns: ColumnDef<any>[] = [
      {
        header: "S/N",
        accessorFn: (row: any, index: number) => index + 1,
        cell: (info: any) => <span>{info.getValue()}</span>,
      },
      {
        header: "Campaign Name",
        accessorKey: "campaignName",
      },
      {
        header: "Start Date",
        accessorKey: "startDate",
        cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        header: "Status",
        accessorKey: "campaignStatus",
        cell: (info: any) => (
          <Text
            fontWeight={"700"}
            fontSize={"12px"}
            color={
              (info.getValue() as string) === "ACTIVE" ? "#009918" : "#990000"
            }
          >
            {(info.getValue() as string) === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
          </Text>
        ),
      },
      {
        header: "Actions",
        cell: (info: any) => {
          const campaignId = info.row.original.id; 
            const campaignName = info.row.original.campaignName; 
          return <Actions id={campaignId} campaignName={campaignName} />;
        },
      },
    ];

  return (
    <Box px={"4rem"}>
      <CampaignNav
        allCampaigns={allCampaigns}
        inactiveCampaigns={inactiveCampaigns}
        activeCampaigns={activeCampaigns}
      />
      <CustomTable
        data={campaign && campaign.length ? campaign : []}
        columns={campaignColumns}
      />
    </Box>
  );
}

export default Campaigns
