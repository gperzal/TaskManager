"use client";

import {
  Flex,
  Box,
  Button,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ThemeSwitcher from "@common/ThemeSwitcher";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const router = useRouter();
  const { user, logout } = useAuth(); 
  


  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={bgColor}
      color={textColor}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
    >
      <HStack spacing={3}>
        <Image src="/logo.svg" alt="Logo" boxSize="40px" />
        <Text fontSize="xl" fontWeight="bold">
          <Link as={NextLink} href="/">
            Task Manager App
          </Link>
        </Text>
      </HStack>

      <HStack spacing={4}>
        <ThemeSwitcher />
        {user ? (
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={user.avatarUrl}
                  name={user.name}
                >
                  <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
                <Text display={{ base: 'none', md: 'flex' }}>{user.name}</Text>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FaChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push('/dashboard')}>Dashboard</MenuItem>
              <MenuItem onClick={() => router.push('/profile')}>Perfil</MenuItem>
              <MenuItem onClick={() => router.push('/settings')}>Configuración</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Button
              as={NextLink}
              href="/login"
              variant="ghost"
              colorScheme="teal"
            >
              Iniciar Sesión
            </Button>
            <Button as={NextLink} href="/register" colorScheme="teal">
              Registrarse
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;

