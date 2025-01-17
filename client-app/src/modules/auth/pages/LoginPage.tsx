"use client";

import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import LoginForm from "@auth/components/LoginForm";
import NextLink from "next/link";

const LoginPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");

  return (
    <Flex align="center" justify="center" minH="100vh" bg={bgColor}>
      <Box
        bg={boxBgColor}
        p={8}
        rounded="lg"
        shadow="lg"
        w={{ base: "90%", sm: "400px" }}
      >
        <Heading mb={6} size="xl" textAlign="center" color="teal.500">
          Iniciar Sesión
        </Heading>
        <LoginForm />
        <Text mt={6} fontSize="sm" textAlign="center">
          ¿No tienes una cuenta?{" "}
          <Link
            as={NextLink}
            href="/register"
            color="teal.500"
            fontWeight="medium"
          >
            Regístrate
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
