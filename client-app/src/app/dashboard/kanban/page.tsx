"use client";

import React from "react";
import { Box, Heading } from "@chakra-ui/react";
// import KanbanBoard from "@kanban/components/KanbanBoard";
// import projectsData from "@/utils/data.json";

export default function KanbanPage() {
  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Tablero Kanban
      </Heading>

      {/* <KanbanBoard projects={projectsData} /> */}
    </Box>
  );
}
