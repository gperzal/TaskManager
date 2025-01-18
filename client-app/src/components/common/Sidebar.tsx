"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { BsKanban } from "react-icons/bs";
import { LuLogs } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "@common/ThemeSwitcher";
import Bread from "@common/Breadcrumb";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

interface SidebarContentProps {
  onClose: () => void;
  display?: { base: string; md: string };
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, route: "/dashboard" },
  { name: "Project", icon: GoProject, route: "/dashboard/project" },
  { name: "Backlog", icon: LuLogs, route: "/dashboard/backlog" },
  { name: "Kanban", icon: BsKanban, route: "/dashboard/kanban" },
  { name: "Sprints", icon: IoCalendarOutline, route: "/dashboard/sprints" },
  { name: "Team", icon: RiTeamLine, route: "/dashboard/team" },
  { name: "Configuración", icon: FiSettings, route: "/dashboard/settings" },
];

const SidebarContent = ({ onClose, display }: SidebarContentProps) => {
  const router = useRouter();

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      display={display}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Task Manager
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Box
          key={link.name}
          as="a"
          onClick={() => router.push(link.route)}
          p="4"
          mx="4"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          cursor="pointer"
          _hover={{
            bg: "teal.400",
            color: "white",
          }}
        >
          <Icon as={link.icon} mr="4" />
          {link.name}
        </Box>
      ))}
    </Box>
  );
};

const MobileNav = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px="4"
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
    >
      <HStack spacing="4" alignItems="center">
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Bread />
      </HStack>

      <HStack spacing="4" alignItems="center">
        <ThemeSwitcher />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="notifications"
          icon={<FiBell />}
        />
        <Menu>
          <MenuButton>
            <HStack>
              <Avatar size="sm" src="https://via.placeholder.com/150" />
              <VStack
                align="flex-start"
                spacing="1px"
                ml="2"
                display={{ base: "none", md: "flex" }}
              >
                <Text fontSize="sm">Usuario</Text>
                <Text fontSize="xs" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <FiChevronDown />
            </HStack>
          </MenuButton>
          <MenuList bg={useColorModeValue("white", "gray.900")}>
            <MenuItem>Perfil</MenuItem>
            <MenuItem>Configuración</MenuItem>
            <MenuDivider />
            <MenuItem>Cerrar Sesión</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
