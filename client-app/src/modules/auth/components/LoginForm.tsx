"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
  useToast,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Formulario enviado", data);
    toast({
      title: "Inicio de sesión exitoso.",
      description: "Has iniciado sesión correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleGuestLogin = () => {
    toast({
      title: "Inicio como invitado.",
      description: "Has iniciado sesión como invitado.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    console.log("Acceso como invitado");
    // Lógica adicional para iniciar sesión como invitado
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        {/* Correo Electrónico */}
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Correo Electrónico</FormLabel>
          <Input
            type="email"
            placeholder="correo@ejemplo.com"
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico inválido",
              },
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Contraseña */}
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...register("password", {
                required: "Este campo es requerido",
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {/* Opciones adicionales */}
        <HStack justify="space-between" width="100%">
          <Checkbox>Recordarme</Checkbox>
          <Button variant="link" colorScheme="teal" size="sm">
            ¿Olvidaste tu contraseña?
          </Button>
        </HStack>

        {/* Botón de Iniciar Sesión */}
        <Button type="submit" colorScheme="teal" w="full" size="lg">
          Iniciar Sesión
        </Button>

        {/* Separador */}
        <Divider />

        {/* Inicio de sesión con terceros */}
        <Text fontSize="sm" textAlign="center">
          O inicia sesión con
        </Text>

        <HStack spacing={4} width="full">
          <Button
            leftIcon={<FaGoogle />}
            colorScheme="red"
            variant="outline"
            flex={1}
          >
            Google
          </Button>
          <Button
            leftIcon={<FaGithub />}
            colorScheme="gray"
            variant="outline"
            flex={1}
          >
            GitHub
          </Button>
        </HStack>

        {/* Botón de Invitado */}
        <Button
          onClick={handleGuestLogin}
          colorScheme="gray"
          variant="outline"
          w="full"
          mt={4}
        >
          Continuar como invitado
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
