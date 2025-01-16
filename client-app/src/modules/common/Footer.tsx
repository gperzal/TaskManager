"use client";

import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const bgGradient = useColorModeValue(
    "linear(to-r, gray.100, gray.200)",
    "linear(to-r, gray.900, gray.800)"
  );
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bgGradient={bgGradient} color={textColor} py={6}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        wrap="wrap"
        maxW="1200px"
        mx="auto"
        px={6}
        gap={4}
      >
        <Text fontSize="sm" textAlign={{ base: "center", md: "left" }}>
          © {new Date().getFullYear()} Task Manager App. Todos los derechos
          reservados.
        </Text>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 2, md: 4 }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Link href="/terms" fontSize="sm" _hover={{ color: "teal.500" }}>
            Términos de Uso
          </Link>
          <Link href="/privacy" fontSize="sm" _hover={{ color: "teal.500" }}>
            Política de Privacidad
          </Link>
          <Link href="/contact" fontSize="sm" _hover={{ color: "teal.500" }}>
            Contacto
          </Link>
        </Stack>

        {/* Redes Sociales */}
        <Flex gap={2} justify={{ base: "center", md: "flex-end" }}>
          <IconButton
            as="a"
            href="https://facebook.com"
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            colorScheme="teal"
            _hover={{ bg: "teal.100" }}
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            colorScheme="teal"
            _hover={{ bg: "teal.100" }}
          />
          <IconButton
            as="a"
            href="https://instagram.com"
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            colorScheme="teal"
            _hover={{ bg: "teal.100" }}
          />
          <IconButton
            as="a"
            href="https://linkedin.com"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
            colorScheme="teal"
            _hover={{ bg: "teal.100" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
