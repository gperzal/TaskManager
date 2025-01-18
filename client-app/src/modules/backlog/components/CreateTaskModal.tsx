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
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function CreateTaskModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Enter task title" />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Enter task description" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Select>
                <option value="module">Module</option>
                <option value="task">Task</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Status</FormLabel>
              <Select>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Priority</FormLabel>
              <Select>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Parent Task</FormLabel>
              <Select>
                <option value="">None (Top Level)</option>
                <option value="1">Módulo de Autenticación</option>
                {/* Add more options dynamically based on available modules */}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Assignee</FormLabel>
              <Select>
                <option value="">Unassigned</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                {/* Add more team members */}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal">Create Task</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

