//  Types for BacklogTable.tsx
export interface Assignee {
  name: string;
  avatar: string;
}

export interface AcceptanceCriteria {
  id: string; 
  description: string;
  isCompleted: boolean;
}

export interface Subtask {
  id: string;
  title: string;
  description?: string; 
  type: string; 
  status: string; 
  assignee: Assignee;
  priority: string; 
  acceptanceCriteria?: AcceptanceCriteria[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: string; 
  status: string; 
  assignee: Assignee;
  priority: string; 
  expanded?: boolean;
  subtasks?: Subtask[];
  acceptanceCriteria?: AcceptanceCriteria[];
}

export interface Filters {
  project: string; 
  searchTerm: string; 
  status: string; 
  assignee: string; 
  priority: string; 
  type?: string; 
}




export interface BacklogTableProps {
  filters: Filters;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  status: string; 
  progress: number;
  currentSprint: string; 
  description: string; 
  startDate: string; 
  endDate: string; 
  priority: string; 
  tasks: Task[];
}


// Types for TaskModal.tsx
export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  isCreatingSubtask: boolean; 
  onSave: (updatedTask: Task) => void;
}


// Types for CreateTaskModal.tsx
export interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}