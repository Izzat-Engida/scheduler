import { create } from "zustand";
import {
  addTask as dbAddTask,
  deleteTask as dbDeleteTask,
  updateTask as dbUpdateTask,
  completeTask as dbCompleteTask,
  uncompleteTask as dbUncompleteTask,
  getTasks as dbGetTasks,
  autoUpdateExpiredTasks,
} from "@/database/db";
import { scheduleTaskNotification } from "@/services/notifications";
import * as Notifications from "expo-notifications";

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
  isadd:boolean;
  openAddTask:(isadd:boolean) => void;
  closeAddTask:(isadd:boolean) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isadd:false,
  openAddTask: (isadd) => set({ isadd:true }),
  closeAddTask: (isadd) => set({ isadd:false }),
  
  loadTasks: async () => {
    await autoUpdateExpiredTasks();
    
    const result = await dbGetTasks();

    const tasks = (result as any[]).map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    start: row.start_datetime, 
    end: row.end_datetime,     
    completed: row.completed === 1,
  }));

    set({ tasks });
  },

  
  addTask: async (title, description, location, start, end) => {
    const result: any = await dbAddTask(title, description, location, start, end);
    const newId = result.lastInsertRowId;
    await scheduleTaskNotification(newId, title, start);
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: newId,
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
    await Notifications.cancelScheduledNotificationAsync(`reminder-${id}`);
    await Notifications.cancelScheduledNotificationAsync(`start-${id}`);

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

 
  updateTask: async (id, title, description, location, start, end) => {
    await dbUpdateTask(id, title, description, location, start, end);

    await Notifications.cancelAllScheduledNotificationsAsync();
    await scheduleTaskNotification(id, title, start);

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