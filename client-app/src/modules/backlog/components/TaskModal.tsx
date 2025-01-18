"use client";

import { useState, useEffect } from 'react';
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
  Input,
  Textarea,
  Select,
  VStack,
  HStack,
  Checkbox,
  Progress,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FiPlus, FiTrash } from 'react-icons/fi';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updatedTask: Task) => void;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  acceptanceCriteria: { id: number; description: string; isCompleted: boolean }[];
}

export default function TaskModal({ isOpen, onClose, task, onSave }: TaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  useEffect(() => {
    if (task) {
      setEditedTask(task);
      updateProgress(task.acceptanceCriteria);
    }
  }, [task]);

  const updateProgress = (criteria: Task['acceptanceCriteria']) => {
    const completedCriteria = criteria.filter(c => c.isCompleted).length;
    const totalCriteria = criteria.length;
    const newProgress = totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0;
    setProgress(newProgress);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    }
  };

  const handleCriteriaChange = (index: number, field: 'description' | 'isCompleted', value: string | boolean) => {
    if (editedTask) {
      const updatedCriteria = [...editedTask.acceptanceCriteria];
      updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
      const updatedTask = { ...editedTask, acceptanceCriteria: updatedCriteria };
      setEditedTask(updatedTask);
      updateProgress(updatedCriteria);
    }
  };

  const addCriteria = () => {
    if (editedTask && editedTask.acceptanceCriteria.length < 8) {
      const newCriteria = {
        id: Date.now(),
        description: '',
        isCompleted: false,
      };
      setEditedTask({
        ...editedTask,
        acceptanceCriteria: [...editedTask.acceptanceCriteria, newCriteria],
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
      const updatedCriteria = editedTask.acceptanceCriteria.filter((_, i) => i !== index);
      const updatedTask = { ...editedTask, acceptanceCriteria: updatedCriteria };
      setEditedTask(updatedTask);
      updateProgress(updatedCriteria);
    }
  };

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
      onClose();
      toast({
        title: "Tarea actualizada",
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
          <Input
            value={editedTask.title}
            onChange={handleInputChange}
            name="title"
            fontWeight="bold"
            fontSize="xl"
            border="none"
            _focus={{ boxShadow: "none" }}
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Descripción Técnica</FormLabel>
              <Textarea
                value={editedTask.description}
                onChange={handleInputChange}
                name="description"
                minHeight="100px"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Criterios de Aceptación</FormLabel>
              <VStack align="stretch" spacing={2}>
                {editedTask.acceptanceCriteria.map((criteria, index) => (
                  <HStack key={criteria.id}>
                    <Checkbox
                      isChecked={criteria.isCompleted}
                      onChange={(e) => handleCriteriaChange(index, 'isCompleted', e.target.checked)}
                    />
                    <Input
                      value={criteria.description}
                      onChange={(e) => handleCriteriaChange(index, 'description', e.target.value)}
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

            <FormControl>
              <FormLabel>Progreso</FormLabel>
              <Progress value={progress} size="sm" colorScheme="teal" />
              <Text mt={2} fontSize="sm">{`${progress.toFixed(0)}% completado`}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Select value={editedTask.status} onChange={handleInputChange} name="status">
                <option value="Por Hacer">Por Hacer</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Realizado">Realizado</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Prioridad</FormLabel>
              <Select value={editedTask.priority} onChange={handleInputChange} name="priority">
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Asignado a</FormLabel>
              <Select value={editedTask.assignee} onChange={handleInputChange} name="assignee">
                <option value="">Sin asignar</option>
                <option value="Usuario 1">Usuario 1</option>
                <option value="Usuario 2">Usuario 2</option>
                {/* Agregar más opciones según los miembros del equipo */}
              </Select>
            </FormControl>
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
