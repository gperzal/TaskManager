"use client";

import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import RegisterForm from "@auth/components/RegisterForm";
import NextLink from "next/link";

const RegisterPage = () => {
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
          Crear una cuenta
        </Heading>
        <RegisterForm />
        <Text mt={6} fontSize="sm" textAlign="center">
          ¿Ya tienes una cuenta?{" "}
          <Link
            as={NextLink}
            href="/login"
            color="teal.500"
            fontWeight="medium"
          >
            Inicia sesión
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
