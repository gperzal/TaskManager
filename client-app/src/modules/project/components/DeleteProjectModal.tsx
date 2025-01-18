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
  Text,
} from "@chakra-ui/react";

import { DeleteProjectModalProps } from "@project/types";

export default function DeleteProjectModal({
  isOpen,
  onClose,
  onDelete,
  projectName,
}: DeleteProjectModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Eliminar Proyecto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            ¿Estás seguro que deseas eliminar el proyecto{" "}
            <strong>{projectName}</strong>? Esta acción no se puede deshacer.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
