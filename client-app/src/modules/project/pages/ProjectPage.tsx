"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  useDisclosure,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import ProjectTable from "@project/components/ProjectTable";
import CreateProjectModal from "@project/components/CreateProjectModal";
import Pagination from "@project/components/Pagination";

export default function ProjectPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={6}>
        <Heading size="lg">Mis Proyectos</Heading>
        <HStack justify="space-between">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Buscar Proyecto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              width="400px"
            />
          </InputGroup>
          <Button leftIcon={<FiPlus />} colorScheme="teal" onClick={onOpen}>
            Nuevo Proyecto
          </Button>
        </HStack>

        <ProjectTable
          searchTerm={searchTerm}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        <Flex justify="center" mt={4}>
          <Pagination
            currentPage={currentPage}
            totalItems={100}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </Flex>
      </VStack>

      <CreateProjectModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
