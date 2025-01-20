"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  HStack,
  Checkbox,
  Progress,
  Text,
  IconButton,
  useToast,
  Input,
  Box,
} from "@chakra-ui/react";
import { FiPlus, FiTrash, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { QuillEditor } from "@/components/common/QuillEditor";
import { Task, TaskModalProps } from "@backlog/types";
import styles from "./TaskModal.module.css";

export default function TaskModal({
  isOpen,
  onClose,
  task,
  isCreatingSubtask,
  onSave,
}: TaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  const toast = useToast();

  useEffect(() => {
    if (isCreatingSubtask) {
      setEditedTask({
        id: Date.now(),
        title: "",
        description: "",
        type: "Subtarea",
        status: "Por Hacer",
        assignee: { name: "", avatar: "" },
        priority: "Baja",
        expanded: false,
        subtasks: [],
        acceptanceCriteria: [],
      });
    } else if (task) {
      const updatedTask = {
        ...task,
        acceptanceCriteria: task.acceptanceCriteria || [],
      };
      setEditedTask(updatedTask);
      updateProgress(updatedTask.acceptanceCriteria || []);
    }
  }, [task, isCreatingSubtask]);

  const updateProgress = (criteria: Task["acceptanceCriteria"]) => {
    if (!criteria) return;
    const completedCriteria = criteria.filter((c) => c.isCompleted).length;
    const totalCriteria = criteria.length;
    const newProgress =
      totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0;
    setProgress(newProgress);
  };

  const handleDescriptionChange = (value: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, description: value });
    }
  };

  const handleCriteriaChange = (
    index: number,
    field: "description" | "isCompleted",
    value: string | boolean
  ) => {
    if (editedTask) {
      const updatedCriteria = [...(editedTask.acceptanceCriteria || [])];
      updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
      setEditedTask({ ...editedTask, acceptanceCriteria: updatedCriteria });
      updateProgress(updatedCriteria);
    }
  };

  const addCriteria = () => {
    if (editedTask && (editedTask.acceptanceCriteria?.length || 0) < 8) {
      const newCriteria = {
        id: Date.now(),
        description: "",
        isCompleted: false,
      };
      setEditedTask({
        ...editedTask,
        acceptanceCriteria: [
          ...(editedTask.acceptanceCriteria || []),
          newCriteria,
        ],
      });
    } else {
      toast({
        title: "Límite alcanzado",
        description: "No se pueden agregar más de 8 criterios de aceptación.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeCriteria = (index: number) => {
    if (editedTask) {
      const updatedCriteria = (editedTask.acceptanceCriteria || []).filter(
        (_, i) => i !== index
      );
      setEditedTask({ ...editedTask, acceptanceCriteria: updatedCriteria });
      updateProgress(updatedCriteria);
    }
  };

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
      onClose();
      toast({
        title: isCreatingSubtask ? "Subtarea creada" : "Tarea actualizada",
        description: "Los cambios han sido guardados exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!editedTask) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isCreatingSubtask
            ? "Crear Subtarea"
            : editedTask?.type === "Subtarea"
            ? "Editar Subtarea"
            : "Editar Tarea"}
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                placeholder="Título de la tarea"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Descripción Técnica</FormLabel>
              <QuillEditor
                value={editedTask.description || ""}
                onChange={handleDescriptionChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Criterios de Aceptación</FormLabel>
              <VStack align="stretch" spacing={2}>
                {editedTask.acceptanceCriteria?.map((criteria, index) => (
                  <HStack key={criteria.id}>
                    <Checkbox
                      isChecked={criteria.isCompleted}
                      onChange={(e) =>
                        handleCriteriaChange(
                          index,
                          "isCompleted",
                          e.target.checked
                        )
                      }
                    />
                    <Input
                      value={criteria.description}
                      onChange={(e) =>
                        handleCriteriaChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe el criterio de aceptación"
                    />
                    <IconButton
                      aria-label="Remove criteria"
                      icon={<FiTrash />}
                      onClick={() => removeCriteria(index)}
                      size="sm"
                    />
                  </HStack>
                ))}
                <Button leftIcon={<FiPlus />} onClick={addCriteria} size="sm">
                  Agregar Criterio
                </Button>
              </VStack>
            </FormControl>

            <Button
              size="sm"
              onClick={toggleDetails}
              rightIcon={showDetails ? <FiChevronUp /> : <FiChevronDown />}
              variant="ghost"
            >
              {showDetails ? "Ocultar Detalles" : "Mostrar Detalles"}
            </Button>

            <Box
              className={`${styles.expandableBox} ${
                showDetails ? styles.expanded : styles.collapsed
              }`}
            >
              <FormControl>
                <FormLabel>Progreso</FormLabel>
                <Progress value={progress} size="sm" colorScheme="teal" />
                <Text mt={2} fontSize="sm">{`${progress.toFixed(
                  0
                )}% completado`}</Text>
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Estado</FormLabel>
                <Select
                  value={editedTask.status}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Por Hacer">Por Hacer</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Realizado">Realizado</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Prioridad</FormLabel>
                <Select
                  value={editedTask.priority}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel mt={2}>Asignado a</FormLabel>
                <Select
                  value={editedTask.assignee.name || ""}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      assignee: { name: e.target.value, avatar: "" },
                    })
                  }
                >
                  <option value="">Sin asignar</option>
                  <option value="Usuario 1">Usuario 1</option>
                  <option value="Usuario 2">Usuario 2</option>
                </Select>
              </FormControl>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
