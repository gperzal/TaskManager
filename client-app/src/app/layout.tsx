"use client";

import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import "./globals.css";

// Configuración del tema
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* ColorModeScript asegura que el tema inicial coincida entre SSR y CSR */}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
