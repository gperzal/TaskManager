import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";

const Bread = () => {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment, index, array) => {
      const href = `/${array.slice(0, index + 1).join("/")}`;
      return { name: segment.charAt(0).toUpperCase() + segment.slice(1), href };
    });

  const activeColor = useColorModeValue("gray.600", "white");
  const inactiveColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Breadcrumb spacing="8px" separator="/">
      {segments.map((segment, index) => (
        <BreadcrumbItem
          key={index}
          isCurrentPage={index === segments.length - 1}
        >
          <BreadcrumbLink
            href={segment.href}
            color={index === segments.length - 1 ? activeColor : inactiveColor}
            fontWeight={index === segments.length - 1 ? "bold" : "normal"}
          >
            {segment.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Bread;
