"use client";

import { Box } from "@chakra-ui/react";
import WelcomeMessage from "../components/WelcomeMessage";
import SummaryGrid from "../components/SummaryGrid";
import NavigationLinks from "../components/NavigationLinks";

export default function DashboardPage() {
  return (
    <Box>
      <WelcomeMessage />
      <SummaryGrid />
      <NavigationLinks />
    </Box>
  );
}
