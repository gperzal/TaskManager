"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import BacklogTable from "@backlog/components/BacklogTable";
import CreateTaskModal from "@backlog/components/CreateTaskModal";
import BacklogFilters from "@backlog/components/BacklogFilters";
import data from "@utils/data.json";

export default function BacklogPage() {
  const projects = data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState({
    project: projects[0]?.id || "",
    status: "all",
    assignee: "all",
    priority: "all",
    searchTerm: "",
  });

  const selectedProject = projects.find(
    (project) => project.id === filters.project
  );

  if (projects.length === 0) {
    return (
      <Box>
        <Heading size="lg" textAlign="center" color="red.500">
          No hay proyectos disponibles.
        </Heading>
      </Box>
    );
  }

  return (
    <Box>
      <Flex direction="column" gap={6}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">Backlog</Heading>
        </Flex>
        <Flex direction="column" align="start">
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            Ud está viendo el backlog del proyecto{" "}
            <Text as="span" color="teal.500">
              {selectedProject?.name || "No Seleccionado"}
            </Text>
          </Text>
        </Flex>
        <Flex
          gap={4}
          wrap={{ base: "wrap", md: "nowrap" }}
          align="center"
          justify="space-between"
        >
          <BacklogFilters
            filters={filters}
            setFilters={setFilters}
            projects={projects}
          />
          <Button
            leftIcon={<FiPlus />}
            colorScheme="teal"
            onClick={onOpen}
            alignSelf={{ base: "flex-start", md: "flex-end" }}
          >
            Nueva Tarea
          </Button>
        </Flex>
        <BacklogTable filters={filters} tasks={selectedProject?.tasks || []} />
      </Flex>
      <CreateTaskModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
