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
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { authApi } from "@/services/api";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await authApi.register({
        email: data.email,
        password: data.password,
      });

      toast({
        title: "Cuenta creada.",
        description: "Te has registrado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Opcional: redirigir al usuario después del registro exitoso
      router.push('/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Error al registrarse",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

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
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
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

        {/* Confirmar Contraseña */}
        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirmar Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              {...register("confirmPassword", {
                required: "Este campo es requerido",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.confirmPassword?.message as string}</FormErrorMessage>
        </FormControl>

        {/* Botón Registrar */}
        <Button 
          type="submit" 
          colorScheme="teal" 
          w="full" 
          size="lg"
          isLoading={isLoading}
          loadingText="Registrando..."
        >
          Registrarse
        </Button>

        {/* Separador */}
        <Divider />

        {/* Registro con Proveedores */}
        <Text fontSize="sm" textAlign="center">
          O regístrate con
        </Text>
        <HStack spacing={4} width="full">
          <Button
            leftIcon={<FaGoogle />}
            colorScheme="red"
            variant="outline"
            flex={1}
            isDisabled={isLoading}
          >
            Google
          </Button>
          <Button
            leftIcon={<FaGithub />}
            colorScheme="gray"
            variant="outline"
            flex={1}
            isDisabled={isLoading}
          >
            GitHub
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default RegisterForm;