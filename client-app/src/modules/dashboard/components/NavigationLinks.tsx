"use client";

import { VStack, HStack, Icon, Text } from "@chakra-ui/react";
import { FaClipboardList, FaTasks, FaUserFriends } from "react-icons/fa";

const NavigationLinks = () => {
  return (
    <VStack spacing={4} align="start">
      <HStack>
        <Icon as={FaClipboardList} color="teal.500" />
        <Text>Tareas en el Backlog</Text>
      </HStack>
      <HStack>
        <Icon as={FaTasks} color="orange.500" />
        <Text>Tablero Kanban</Text>
      </HStack>
      <HStack>
        <Icon as={FaUserFriends} color="blue.500" />
        <Text>Gestiona tu Equipo</Text>
      </HStack>
    </VStack>
  );
};

export default NavigationLinks;
