"use client";

import { SimpleGrid, HStack, Box, Text, Icon } from "@chakra-ui/react";
import { FaTasks, FaClipboardList, FaUserFriends } from "react-icons/fa";

const SummaryGrid = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
      <HStack
        bg="teal.100"
        p={6}
        rounded="md"
        shadow="md"
        justify="space-between"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="black">
            12
          </Text>
          <Text fontSize="sm" color="gray.600">
            Tareas Pendientes
          </Text>
        </Box>
        <Icon as={FaTasks} boxSize={8} color="teal.600" />
      </HStack>
      <HStack
        bg="orange.100"
        p={6}
        rounded="md"
        shadow="md"
        justify="space-between"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="black">
            3
          </Text>
          <Text fontSize="sm" color="gray.600">
            Sprints Activos
          </Text>
        </Box>
        <Icon as={FaClipboardList} boxSize={8} color="orange.600" />
      </HStack>
      <HStack
        bg="blue.100"
        p={6}
        rounded="md"
        shadow="md"
        justify="space-between"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="black">
            5
          </Text>
          <Text fontSize="sm" color="gray.600">
            Miembros del Equipo
          </Text>
        </Box>
        <Icon as={FaUserFriends} boxSize={8} color="blue.600" />
      </HStack>
    </SimpleGrid>
  );
};

export default SummaryGrid;
