"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/api";
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
  Container,
  Heading,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await authApi.login(data);
      toast({
        title: "Inicio de sesión exitoso.",
        description: "Has iniciado sesión correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push('/dashboard'); // Redirige al dashboard después del login exitoso
    } catch (error: any) {
      toast({
        title: "Error de inicio de sesión.",
        description: error.message || "Ha ocurrido un error al iniciar sesión.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // Implementa la lógica para el inicio de sesión como invitado
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={6}>
        <Heading size="lg">Iniciar Sesión</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
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
              <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
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
              <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage>
            </FormControl>

            {/* Opciones adicionales */}
            <HStack justify="space-between" width="100%">
              <Checkbox>Recordarme</Checkbox>
              <Button variant="link" colorScheme="teal" size="sm">
                ¿Olvidaste tu contraseña?
              </Button>
            </HStack>

            {/* Botón de Iniciar Sesión */}
            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              size="lg"
              isLoading={isLoading}
              loadingText="Iniciando sesión..."
            >
              Iniciar Sesión
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default LoginForm;

