"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaTwitter, FaYoutube, FaInstagram, FaArrowUp } from "react-icons/fa";

const Logo = () => {
  return (
    <Flex alignItems="center">
      <Image src="/logo.svg" alt="Logo" boxSize="40px" mr={2} />
      <Text fontSize="lg" fontWeight="bold">
        Task Manager App
      </Text>
    </Flex>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={6}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo />
            </Box>
            <Text fontSize={"sm"}>
              © {new Date().getFullYear()} Task Manager App. Todos los derechos
              reservados
            </Text>
            <Stack direction={"row"} spacing={6}>
              <FaTwitter />
              <FaYoutube />
              <FaInstagram />
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Producto</ListHeader>
            <Link href={"/features"}>Características</Link>
            <Link href={"/pricing"}>Precios</Link>
            <Link href={"/faq"}>FAQ</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Compañía</ListHeader>
            <Link href={"/contact"}>Contacto</Link>
            <Link href={"/terms"}>Términos de servicio</Link>
            <Link href={"/privacy"}>Política de privacidad</Link>
          </Stack>
        </SimpleGrid>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Tag
            size={"md"}
            variant="solid"
            colorScheme="teal"
            cursor="pointer"
            onClick={scrollToTop}
          >
            <FaArrowUp />
            <Text ml={2}>Volver arriba</Text>
          </Tag>
        </Stack>
      </Container>
    </Box>
  );
}
