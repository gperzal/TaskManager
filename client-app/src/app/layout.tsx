"use client";

import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Navbar from "@/modules/common/Navbar";
import Footer from "@/modules/common/Footer";
import theme from "@/styles/theme";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard"); 

  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <Flex direction="column" minH="100vh">
            {/* Renderiza Navbar y Footer solo fuera del dashboard */}
            {!isDashboard && <Navbar />}
            <Box as="main" flex="1">
              {children}
            </Box>
            {!isDashboard && <Footer />}
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
