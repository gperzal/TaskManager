'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authApi } from '@/services/api';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
  VStack,
  Container,
  Heading,
} from '@chakra-ui/react';

const RegisterForm = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({
        email: data.email,
        password: data.password,
      });

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Aquí puedes agregar la redirección después del registro exitoso
      // window.location.href = '/dashboard';

    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Error al registrarse",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={6}>
        <Heading size="lg">Registro</Heading>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={errors.email}>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                {...register('email', {
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Correo electrónico inválido'
                  }
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="********"
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel>Confirmar contraseña</FormLabel>
              <Input
                type="password"
                placeholder="********"
                {...register('confirmPassword', {
                  required: 'Por favor confirma tu contraseña',
                  validate: (val) => {
                    if (watch('password') != val) {
                      return "Las contraseñas no coinciden";
                    }
                  }
                })}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isLoading}
              loadingText="Registrando..."
            >
              Registrarse
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default RegisterForm;