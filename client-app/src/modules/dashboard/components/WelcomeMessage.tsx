"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

const WelcomeMessage = () => {
  return (
    <Box mb={6}>
      <Heading size="xl" color="teal.500">
        Bienvenido al Dashboard
      </Heading>
      <Text color="gray.500">
        Aquí puedes ver un resumen de tus tareas, sprints y backlog.
      </Text>
    </Box>
  );
};

export default WelcomeMessage;
