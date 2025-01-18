//  Types for BacklogTable.tsx
export interface Assignee {
  name: string;
  avatar: string;
}

export interface Subtask {
  id: number;
  title: string;
  type: string; // Ejemplo: "Subtarea"
  status: string; // Ejemplo: "Por hacer", "Finalizado"
  assignee: Assignee;
  priority: string; // Ejemplo: "Alta", "Media", "Baja"
}

export interface Task {
  id: number;
  title: string;
  type: string; // Ejemplo: "Tarea"
  status: string; // Ejemplo: "En progreso"
  assignee: Assignee;
  priority: string; // Ejemplo: "Alta", "Media", "Baja"
  expanded?: boolean;
  subtasks?: Subtask[];
}

export interface Filters {
  project: string; // ID del proyecto seleccionado
  searchTerm: string; // Texto de búsqueda
  status: string; // Ejemplo: "all", "done", "in-progress"
  assignee: string; // Ejemplo: "all", "me", "unassigned"
  priority: string; // Ejemplo: "all", "high", "medium", "low"
  type?: string; // Ejemplo: "Tarea", "Subtarea"
}


export interface BacklogTableProps {
  filters: Filters;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  status: string; // Ejemplo: "En Proceso", "Planificación"
  progress: number; // Porcentaje completado
  currentSprint: string; // Ejemplo: "Sprint 3"
  description: string; // Descripción del proyecto
  startDate: string; // Fecha de inicio
  endDate: string; // Fecha de fin
  priority: string; // Ejemplo: "Alta", "Media", "Baja"
  tasks?: Task[]; // Tareas asociadas al proyecto
}
