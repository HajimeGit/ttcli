export class Task {
  constructor(description) {
    this.id = TaskManager.getTaskNextId();
    this.description = description;
    this.status = TASK_TODO;
  }
}

class TaskManagerClass {
  constructor() {
    this.tasks = [];
  }

  setTasks(data) {
    this.tasks = JSON.parse(data);
  }

  getTasks() {
    return this.tasks;
  }

  getTaskNextId() {
    const tasks = this.getTasks();

    if (tasks.length === 0) {
      return 1;
    }

    let id = this.getTasks().reduce(
      (max, task) => (task.id > max ? task.id : max),
      0
    );

    return ++id;
  }

  getTasksByStatus(status) {
    return this.tasks.filter((task) => task.status === status);
  }

  get(id) {
    return this.tasks.find((task) => id == task.id);
  }

  remove(id) {
    this.tasks = this.tasks.filter((task) => task.id != id);
  }

  add(task) {
    return this.tasks.push(task);
  }

  update(id, key, value) {
    this.tasks = this.tasks.map((task) =>
      task.id == id ? { ...task, [key]: value } : task
    );
  }

  clear() {
    this.tasks = [];
  }
}

// Singleton pattern.
export const TaskManager = new TaskManagerClass();

export const TASK_TODO = 'todo';
export const TASK_IN_PROGRESS = 'in-progress';
export const TASK_DONE = 'done';

export const TASK_STATUSES = [TASK_TODO, TASK_IN_PROGRESS, TASK_DONE];
