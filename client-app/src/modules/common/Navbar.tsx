"use client";

import {
  Flex,
  Box,
  Button,
  Spacer,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ThemeSwitcher from "@/modules/common/ThemeSwitcher";

const Navbar = () => {
  const bgColor = useColorModeValue("whiteAlpha.800", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={bgColor}
      color={textColor}
      shadow="md"
      backdropFilter="blur(10px)"
    >
      <HStack spacing={3}>
        <Image src="/logo.svg" alt="Logo" boxSize="40px" />
        <Text fontSize="xl" fontWeight="bold">
          <Link href="/">Task Manager App</Link>
        </Text>
      </HStack>

      <Spacer />

      <Box display="flex" alignItems="center">
        <ThemeSwitcher />
        <Button
          as={NextLink}
          href="/login"
          variant="ghost"
          mr={2}
          colorScheme="teal"
        >
          Iniciar Sesión
        </Button>
        <Button as={NextLink} href="/register" colorScheme="teal">
          Registrarse
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
