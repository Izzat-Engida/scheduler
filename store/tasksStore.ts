import { create } from "zustand";
import {
  addTask as dbAddTask,
  deleteTask as dbDeleteTask,
  updateTask as dbUpdateTask,
  completeTask as dbCompleteTask,
  uncompleteTask as dbUncompleteTask,
  getTasks as dbGetTasks,
} from "@/database/db";

interface Task {
  id: number;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];

  loadTasks: () => Promise<void>;

  addTask: (
    title: string,
    description: string,
    location: string,
    start: string,
    end: string
  ) => Promise<void>;

  deleteTask: (id: number) => Promise<void>;

  updateTask: (
    id: number,
    title: string,
    description: string,
    location: string,
    start: string,
    end: string
  ) => Promise<void>;

  completeTask: (id: number) => Promise<void>;

  uncompleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  
  loadTasks: async () => {
    const tasks = await dbGetTasks();

    set({
      tasks: tasks as Task[],
    });
  },

  
  addTask: async (title, description, location, start, end) => {
    const result: any = await dbAddTask(title, description, location, start, end);

    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: result.lastInsertRowId,
          title,
          description,
          location,
          start,
          end,
          completed: false,
        },
      ],
    }));
  },


  deleteTask: async (id) => {
    await dbDeleteTask(id);

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

 
  updateTask: async (id, title, description, location, start, end) => {
    await dbUpdateTask(id, title, description, location, start, end);

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, title, description, location, start, end }
          : task
      ),
    }));
  },


  completeTask: async (id) => {
    await dbCompleteTask(id);

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      ),
    }));
  },


  uncompleteTask: async (id) => {
    await dbUncompleteTask(id);

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      ),
    }));
  },
}));