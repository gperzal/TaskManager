"use client";

import { Box } from "@chakra-ui/react";
import WelcomeMessage from "@dashboard/components/WelcomeMessage";
import SummaryGrid from "@dashboard/components/SummaryGrid";
import NavigationLinks from "@dashboard/components/NavigationLinks";

export default function DashboardPage() {
  return (
    <Box>
      <WelcomeMessage />
      <SummaryGrid />
      <NavigationLinks />
    </Box>
  );
}
