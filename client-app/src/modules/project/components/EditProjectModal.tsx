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
  Input,
  VStack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { QuillEditor } from "@/components/common/QuillEditor";
import { EditableProject, EditProjectModalProps } from "@project/types";

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
  onUpdate,
}: EditProjectModalProps) {
  const [projectData, setProjectData] = useState<EditableProject>(project);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setProjectData(project);
  }, [project]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!projectData.name)
      newErrors.name = "El nombre del proyecto es obligatorio.";
    if (!projectData.startDate)
      newErrors.startDate = "La fecha de inicio es obligatoria.";
    if (!projectData.endDate)
      newErrors.endDate = "La fecha de finalización es obligatoria.";
    if (!projectData.priority)
      newErrors.priority = "La prioridad es obligatoria.";
    if (!projectData.description)
      newErrors.description = "La descripción es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      onUpdate(projectData);
      toast({
        title: "Proyecto actualizado.",
        description: "Los cambios se han guardado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Proyecto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel>Nombre del Proyecto</FormLabel>
              <Input
                name="name"
                value={projectData.name}
                onChange={handleInputChange}
                placeholder="Ejemplo: Rediseño de la Página Web"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description} isRequired>
              <FormLabel>Descripción</FormLabel>
              <QuillEditor
                value={projectData.description}
                onChange={(value) =>
                  setProjectData({ ...projectData, description: value })
                }
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.startDate} isRequired>
              <FormLabel>Fecha de Inicio</FormLabel>
              <Input
                type="date"
                name="startDate"
                value={projectData.startDate}
                onChange={handleInputChange}
              />
              <FormErrorMessage>{errors.startDate}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.endDate} isRequired>
              <FormLabel>Fecha de Finalización</FormLabel>
              <Input
                type="date"
                name="endDate"
                value={projectData.endDate}
                onChange={handleInputChange}
              />
              <FormErrorMessage>{errors.endDate}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.priority} isRequired>
              <FormLabel>Prioridad</FormLabel>
              <Select
                name="priority"
                value={projectData.priority}
                onChange={handleInputChange}
                placeholder="Seleccionar prioridad"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </Select>
              <FormErrorMessage>{errors.priority}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Guardar Cambios
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
