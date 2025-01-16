import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'El correo electrónico es requerido';
    if (!password) newErrors.password = 'La contraseña es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en las credenciales');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md" py={8}>
      <VStack spacing={6}>
        <Heading size="lg">Iniciar Sesión</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              width="full"
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