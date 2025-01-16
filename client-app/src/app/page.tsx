"use client";

import {
  Box,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Page() {
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Stack
      align="center"
      justify="center"
      minH="100vh"
      bg={bg}
      color={color}
      spacing={4}
    >
      <Box p={4} shadow="md" borderRadius="md">
        Chakra UI v2.10.4 Demo
      </Box>
      <Button onClick={toggleColorMode} colorScheme="teal">
        Cambiar Tema
      </Button>
    </Stack>
  );
}
