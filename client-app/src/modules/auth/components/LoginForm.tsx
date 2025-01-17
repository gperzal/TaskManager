"use client";

import {
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
import { useRouter } from "next/navigation";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
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
      duration: 2000,
      isClosable: true,
    });

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
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

        <HStack justify="space-between" width="100%">
          <Checkbox>Recordarme</Checkbox>
          <Button variant="link" colorScheme="teal" size="sm">
            ¿Olvidaste tu contraseña?
          </Button>
        </HStack>

        <Button type="submit" colorScheme="teal" w="full" size="lg">
          Iniciar Sesión
        </Button>

        <Divider />

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
