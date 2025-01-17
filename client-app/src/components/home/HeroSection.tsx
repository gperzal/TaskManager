"use client";

import {
  Box,
  Flex,
  Image,
  useColorModeValue,
  Icon,
  Text,
  Container,
  VStack,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FaCheckCircle, FaUserFriends, FaChartLine } from "react-icons/fa";
import { IconProps } from "@chakra-ui/react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Tipar las propiedades de Blob como IconProps
const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

interface TaskCardProps {
  icon: React.ElementType; // Tipo para los íconos
  text: string;
  delay: number;
}

const TaskCard = ({ icon, text, delay }: TaskCardProps) => (
  <MotionBox
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    bg={useColorModeValue("white", "gray.700")}
    p={4}
    rounded="md"
    shadow="lg"
    width="full"
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
  >
    <HStack spacing={4}>
      <Icon as={icon} w={6} h={6} color="teal.500" />
      <Text fontWeight="medium">{text}</Text>
    </HStack>
  </MotionBox>
);

export default function HeroSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }));
  }, [controls]);

  return (
    <Container maxW={"7xl"} overflow="hidden" py={20}>
      <Flex
        align={"center"}
        justify={"space-between"}
        wrap={"wrap"}
        direction={{ base: "column", md: "row" }}
      >
        <MotionBox
          flex={1}
          position="relative"
          height={{ base: "300px", md: "500px" }}
          rounded={"2xl"}
          boxShadow={"2xl"}
          width={"full"}
          overflow={"hidden"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            alt={"Hero Image"}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            src={
              "https://www.techtitute.com/techtitute/cursos/018213660/recursos/banner/experto-online-programacion-costos-proyecto-tecnologico.jpg"
            }
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.4)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={4} align="stretch" maxW="80%">
              <Heading
                color="white"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                textAlign="center"
              >
                Gestiona tus proyectos, potencia tu equipo
              </Heading>
              <Text
                color="white"
                fontSize={{ base: "md", lg: "lg" }}
                textAlign="center"
              >
                Task Manager App: Tu solución integral para organizar, colaborar
                y triunfar
              </Text>
            </VStack>
          </Box>
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("teal.50", "teal.400")}
          />
        </MotionBox>

        <MotionFlex
          flex={1}
          direction="column"
          justify="center"
          align="stretch"
          mt={{ base: 10, md: 0 }}
          ml={{ md: 10 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VStack spacing={6} align="stretch">
            <TaskCard
              icon={FaCheckCircle}
              text="Crea y asigna tareas con facilidad"
              delay={0.3}
            />
            <TaskCard
              icon={FaUserFriends}
              text="Colabora en tiempo real con tu equipo"
              delay={0.5}
            />
            <TaskCard
              icon={FaChartLine}
              text="Analiza el progreso y optimiza el rendimiento"
              delay={0.7}
            />
          </VStack>
        </MotionFlex>
      </Flex>
    </Container>
  );
}
