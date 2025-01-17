"use client";

import Sidebar from "@common/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>{children}</Sidebar>
    </ChakraProvider>
  );
}
