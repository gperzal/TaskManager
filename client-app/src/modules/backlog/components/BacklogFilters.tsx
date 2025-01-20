"use client";

import {
  HStack,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { Filters, Project } from "@backlog/types";

interface BacklogFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  projects: Project[];
}

export default function BacklogFilters({
  filters,
  setFilters,
  projects,
}: BacklogFiltersProps) {
  return (
    <HStack spacing={4} flex="1">
      <Select
        value={filters.project}
        onChange={(e) => setFilters({ ...filters, project: e.target.value })}
        maxW="250px"
        placeholder="Selecciona un proyecto"
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </Select>
      <InputGroup maxW="300px">
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Buscar tarea o subtarea..."
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />
      </InputGroup>
      <Select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        maxW="150px"
      >
        <option value="all">Todos</option>
        <option value="todo">Por Hacer</option>
        <option value="in-progress">En Progreso</option>
        <option value="done">Finalizado</option>
      </Select>
      <Select
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        maxW="150px"
      >
        <option value="all">Todos</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </Select>
    </HStack>
  );
}
