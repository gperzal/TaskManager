"use client";

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
  Select,
  VStack,
} from "@chakra-ui/react";
import { QuillEditor } from "@/components/common/QuillEditor";
import { useState } from "react";
import { CreateTaskModalProps } from "@backlog/types";

export default function CreateTaskModal({
  isOpen,
  onClose,
}: CreateTaskModalProps) {
  const [description, setDescription] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Nueva Tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input placeholder="Ingresa el título de la tarea" />
            </FormControl>
            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <QuillEditor value={description} onChange={setDescription} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Estado</FormLabel>
              <Select>
                <option value="todo">Por Hacer</option>
                <option value="in-progress">En Proceso</option>
                <option value="done">Finalizado</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Prioridad</FormLabel>
              <Select>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Tarea Principal</FormLabel>
              <Select>
                <option value="">Ninguna (Nivel Superior)</option>
                <option value="1">Módulo de Autenticación</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Asignado a</FormLabel>
              <Select>
                <option value="">Sin Asignar</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal">Crear Tarea</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
