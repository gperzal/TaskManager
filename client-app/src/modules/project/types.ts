// Types for ProjectTable.tsx

export type Priority = "Baja" | "Media" | "Alta";
export type Status = "Planificación" | "En Proceso" | "Completo";

export interface Project {
  id: string;
  name: string;
  status: Status;
  progress: number;
  currentSprint: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: Priority;
}

export interface ProjectTableProps {
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

// Types for EditProjectModal.tsx
export interface EditableProject {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  status: Status;
}

export interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: EditableProject;
  onUpdate: (updatedProject: EditableProject) => void;
}

// Types for DeleteProjectModal.tsx
export interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  projectName: string;
}

// Types for Pagination
export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}


// Types for CreateProjectModal
export interface ProjectData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: string;
}

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}