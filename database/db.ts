import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("izzat_time.db");

export const initDataBase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      location TEXT,
      start_datetime TEXT NOT NULL,
      end_datetime TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);
};

export const addTask = async (
  title: string,
  description: string,
  location: string,
  start: string,
  end: string
) => {
  
  return await db.runAsync(
    `
    INSERT INTO tasks(title,description,location,start_datetime,end_datetime)
    VALUES (?,?,?,?,?)
  `,
    [title, description, location, start, end]
  );
};

export const getTasks = async () => {
  return await db.getAllAsync(
    `SELECT * FROM tasks ORDER BY start_datetime ASC`
  );
};

export const deleteTask = async (id: number) => {
  return await db.runAsync(`DELETE FROM tasks WHERE id=?`, [id]);
};

export const updateTask = async (
  id: number,
  title: string,
  description: string,
  location: string,
  start: string,
  end: string
) => {
  return await db.runAsync(
    `UPDATE tasks
     SET title=?,description=?,location=?,start_datetime=?,end_datetime=?
     WHERE id=?`,
    [title, description, location, start, end, id]
  );
};

export const completeTask = async (id: number) => {
  return await db.runAsync(
    `UPDATE tasks SET completed=1 WHERE id=?`,
    [id]
  );
};

export const uncompleteTask = async (id: number) => {
  return await db.runAsync(
    `UPDATE tasks SET completed=0 WHERE id=?`,
    [id]
  );
};
export const autoUpdateExpiredTasks = async () => {
  const currentTime = new Date().toISOString();
  try {
    return await db.runAsync(
      `UPDATE tasks 
       SET completed = 1 
       WHERE end_datetime < ? AND completed = 0`,
      [currentTime]
    );
  } catch (error) {
    console.error("Error auto-updating tasks:", error);
  }
};