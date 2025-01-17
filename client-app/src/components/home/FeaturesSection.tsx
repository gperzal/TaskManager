"use client";

import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
} from "@chakra-ui/react";
import { FcAssistant, FcCollaboration, FcDoughnutChart } from "react-icons/fc";
import { motion } from "framer-motion";

const MotionBox = motion(Box); // Convertimos Box en un componente animado

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Stack>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={"gray.100"}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={"gray.600"}>{text}</Text>
      </Stack>
    </MotionBox>
  );
};

export default function FeaturesSection() {
  return (
    <Box p={4} bg="gray.50">
      <Container maxW={"7xl"} py={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Asistencia 24/7"}
            text={
              "Nuestro equipo de soporte está disponible en todo momento para ayudarte con cualquier duda o problema."
            }
          />
          <Feature
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            title={"Colaboración en tiempo real"}
            text={
              "Trabaja con tu equipo en tiempo real, compartiendo ideas y actualizaciones instantáneamente."
            }
          />
          <Feature
            icon={<Icon as={FcDoughnutChart} w={10} h={10} />}
            title={"Análisis avanzados"}
            text={
              "Obtén insights valiosos sobre el rendimiento de tu equipo y el progreso de tus proyectos."
            }
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
