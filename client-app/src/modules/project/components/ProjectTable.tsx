"use client";

import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Progress,
  Box,
  IconButton,
  Tooltip,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  Project,
  ProjectTableProps,
  Priority,
  Status,
} from "@project/types";
import EditProjectModal from "@project/components/EditProjectModal";
import DeleteProjectModal from "@project/components/DeleteProjectModal";

const projects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    status: "En Proceso",
    progress: 65,
    currentSprint: "Sprint 3",
    description: "Este es el proyecto Alpha.",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    priority: "Alta",
  },
  {
    id: "2",
    name: "Project Beta",
    status: "Planificación",
    progress: 10,
    currentSprint: "Sprint 1",
    description: "Este es el proyecto Beta.",
    startDate: "2023-02-01",
    endDate: "2023-06-30",
    priority: "Media",
  },
  {
    id: "3",
    name: "Project Gamma",
    status: "Completo",
    progress: 100,
    currentSprint: "Sprint 5",
    description: "Este es el proyecto Gamma.",
    startDate: "2022-03-01",
    endDate: "2022-11-30",
    priority: "Baja",
  },
];

const statusColors: Record<Status, string> = {
  "En Proceso": "yellow",
  Planificación: "blue",
  Completo: "green",
};

const priorityColors: Record<Priority, string> = {
  Baja: "green",
  Media: "yellow",
  Alta: "red",
};

export default function ProjectTable({
  searchTerm,
  currentPage,
  itemsPerPage,
}: ProjectTableProps) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleEdit = (id: string) => {
    const projectToEdit = projects.find((project) => project.id === id);
    if (projectToEdit) {
      setSelectedProject(projectToEdit);
      setEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const projectToDelete = projects.find((project) => project.id === id);
    if (projectToDelete) {
      setSelectedProject(projectToDelete);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    console.log(`Proyecto eliminado: ${selectedProject?.name}`);
    setDeleteModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Nombre</Th>
            <Th>Estado</Th>
            <Th>Prioridad</Th>
            <Th>Progreso</Th>
            <Th>Sprint Actual</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentProjects.map((project, index) => (
            <Tr key={project.id}>
              <Td>{indexOfFirstItem + index + 1}</Td>
              <Td>{project.name}</Td>
              <Td>
                <Badge colorScheme={statusColors[project.status]}>
                  {project.status}
                </Badge>
              </Td>
              <Td>
                <Badge colorScheme={priorityColors[project.priority]}>
                  {project.priority}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Progress
                    value={project.progress}
                    size="sm"
                    colorScheme="teal"
                    width="100px"
                  />
                  <Text fontSize="sm">{project.progress}%</Text>
                </HStack>
              </Td>
              <Td>{project.currentSprint}</Td>
              <Td>
                <HStack spacing={2}>
                  <Tooltip label="Editar Proyecto">
                    <IconButton
                      aria-label="Editar Proyecto"
                      icon={<FiEdit2 />}
                      size="sm"
                      onClick={() => handleEdit(project.id)}
                    />
                  </Tooltip>
                  <Tooltip label="Eliminar Proyecto">
                    <IconButton
                      aria-label="Eliminar Proyecto"
                      icon={<FiTrash2 />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(project.id)}
                    />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text mt={4} fontSize="sm">
        Mostrando{" "}
        {filteredProjects.slice(indexOfFirstItem, indexOfLastItem).length} de{" "}
        {filteredProjects.length} proyectos.
      </Text>

      {selectedProject && (
        <>
          <EditProjectModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            project={selectedProject}
            onUpdate={(updatedProject) =>
              console.log("Actualizado:", updatedProject)
            }
          />
          <DeleteProjectModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={confirmDelete}
            projectName={selectedProject.name}
          />
        </>
      )}
    </Box>
  );
}
