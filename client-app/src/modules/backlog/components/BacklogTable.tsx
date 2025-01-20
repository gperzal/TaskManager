"use client";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Badge,
  HStack,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiChevronRight,
  FiChevronDown,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import { useState, ReactNode, Fragment } from "react";
import TaskModal from "@backlog/components/TaskModal";
import { Task, BacklogTableProps } from "@backlog/types";

export default function BacklogTable({ filters, tasks }: BacklogTableProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingSubtask, setIsCreatingSubtask] = useState(false);

  const openModal = (task: Task | null, isSubtask = false) => {
    setSelectedTask(task);
    setIsCreatingSubtask(isSubtask);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
    setIsCreatingSubtask(false);
  };

  const toggleExpand = (taskId: string) => {
    setExpandedModules((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const rowBgColorModule = useColorModeValue("gray.100", "gray.800");
  const rowBgColorTask = useColorModeValue("white", "gray.900");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  const renderTaskRow = (
    task: Task,
    depth: number = 0,
    parentId: string = "",
    index: number = 1
  ): ReactNode => {
    const isExpanded = expandedModules.includes(task.id);
    const currentIndex = parentId ? `${parentId}.${index}` : `${index}`;
    const rowBgColor =
      task.type === "Tarea" ? rowBgColorModule : rowBgColorTask;
    const uniqueKey = `${parentId}-${task.id}-${index}`;

    return (
      <Fragment key={uniqueKey}>
        <Tr bg={rowBgColor} _hover={{ bg: hoverBgColor }}>
          <Td pl={`${depth * 2}rem`} width="40px">
            {task.subtasks && task.subtasks.length > 0 && (
              <IconButton
                aria-label={isExpanded ? "Collapse" : "Expand"}
                icon={isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                size="sm"
                variant="ghost"
                onClick={() => toggleExpand(task.id)}
              />
            )}
          </Td>
          <Td width="60px">
            <Text fontSize="sm" color="gray.500">
              {currentIndex}
            </Text>
          </Td>
          <Td>
            <Text>{task.title}</Text>
          </Td>
          <Td>
            <Badge
              variant="subtle"
              colorScheme={task.type === "Tarea" ? "purple" : "gray"}
            >
              {task.type}
            </Badge>
          </Td>
          <Td>
            <Badge
              colorScheme={task.status === "Finalizado" ? "gray" : "green"}
            >
              {task.status}
            </Badge>
          </Td>
          <Td>
            <Badge
              px={2}
              py={1}
              borderRadius="full"
              colorScheme={
                task.priority === "Alta"
                  ? "red"
                  : task.priority === "Media"
                  ? "orange"
                  : "blue"
              }
            >
              {task.priority}
            </Badge>
          </Td>
          <Td>
            <HStack spacing={2}>
              <Avatar
                size="sm"
                name={task.assignee.name}
                src={task.assignee.avatar}
              />
              <Text fontSize="sm">{task.assignee.name}</Text>
            </HStack>
          </Td>
          <Td>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FiMoreVertical />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                {task.type === "Tarea" && (
                  <MenuItem
                    icon={<FiPlus />}
                    onClick={() => openModal(task, true)}
                  >
                    Agregar Subtarea
                  </MenuItem>
                )}
                <MenuItem icon={<FiEdit2 />} onClick={() => openModal(task)}>
                  Editar
                </MenuItem>
                <MenuItem icon={<FiTrash2 />} color="red.500">
                  Eliminar
                </MenuItem>
              </MenuList>
            </Menu>
          </Td>
        </Tr>
        {isExpanded &&
          task.subtasks?.map((subtask, idx) =>
            renderTaskRow(subtask, depth + 1, task.id.toString(), idx + 1)
          )}
      </Fragment>
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = filters.searchTerm
      ? task.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      : true;

    const matchesStatus =
      filters.status === "all" || task.status === filters.status;

    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width="20px"></Th>
            <Th width="20px">#</Th>
            <Th>Título</Th>
            <Th>Categoría</Th>
            <Th>Estado</Th>
            <Th>Prioridad</Th>
            <Th>Asignado a</Th>
            <Th width="20px">Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTasks.map((task, index) =>
            renderTaskRow(task, 0, "", index + 1)
          )}
        </Tbody>
      </Table>
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isCreatingSubtask={isCreatingSubtask}
        task={
          isCreatingSubtask
            ? {
                id: Date.now().toString(),
                title: "",
                description: "",
                type: "Subtarea",
                status: "Por Hacer",
                assignee: { name: "", avatar: "" },
                priority: "Baja",
                expanded: false,
                subtasks: [],
                acceptanceCriteria: [],
              }
            : selectedTask
        }
        onSave={(updatedTask) => {
          if (isCreatingSubtask && selectedTask) {
            console.log("Subtarea creada:", updatedTask);
          } else {
            console.log("Tarea actualizada:", updatedTask);
          }
        }}
      />
    </Box>
  );
}
