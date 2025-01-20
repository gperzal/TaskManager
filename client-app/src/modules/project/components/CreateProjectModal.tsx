"use client";

import { useState } from "react";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { QuillEditor } from "@/components/common/QuillEditor";
import { ProjectData, CreateProjectModalProps } from "@project/types";

export default function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    console.log("Datos del proyecto:", {
      ...projectData,
      status: "En Planificación",
    });
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Proyecto creado.",
        description: "El proyecto se ha creado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setProjectData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "",
      });
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Nuevo Proyecto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
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
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </Select>
                <FormErrorMessage>{errors.priority}</FormErrorMessage>
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Crear Proyecto"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
