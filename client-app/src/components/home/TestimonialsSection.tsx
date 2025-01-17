"use client";

import { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box); // Convertimos Box en un componente animado

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function TestimonialsSection() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Nuestros Clientes Hablan</Heading>
          <Text>Hemos trabajado con empresas de todo el mundo</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          {/* Reemplazamos motion.div por MotionBox */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Gestión Eficiente</TestimonialHeading>
                <TestimonialText>
                  Task Manager App ha revolucionado la forma en que gestionamos
                  nuestros proyectos. La interfaz intuitiva y las potentes
                  funciones nos han permitido aumentar nuestra productividad
                  significativamente.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                }
                name={"Jane Cooper"}
                title={"CEO de TechCorp"}
              />
            </Testimonial>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Colaboración Mejorada</TestimonialHeading>
                <TestimonialText>
                  Desde que empezamos a usar Task Manager App, la colaboración
                  en nuestro equipo ha mejorado enormemente. La capacidad de
                  asignar tareas, compartir archivos y comunicarnos en tiempo
                  real ha hecho que nuestros proyectos avancen más rápido que
                  nunca.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                }
                name={"María Rodríguez"}
                title={"Gerente de Proyectos en InnovaTech"}
              />
            </Testimonial>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Análisis Detallado</TestimonialHeading>
                <TestimonialText>
                  Los informes y análisis que ofrece Task Manager App nos han
                  permitido tomar decisiones más informadas y mejorar
                  constantemente nuestros procesos. Es una herramienta
                  indispensable para cualquier equipo que busque optimizar su
                  rendimiento.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                }
                name={"Carlos Sánchez"}
                title={"Director de Operaciones en DataSolutions"}
              />
            </Testimonial>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
