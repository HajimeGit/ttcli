import { Task, TaskManager } from '../models/task.js';

const add = (description) => {
  const task = new Task(description);
  TaskManager.add(task);
  return task.id;
};

const remove = (id) => {
  TaskManager.remove(id);
  return id;
};

const update = (id, key, value) => {
  TaskManager.update(id, key, value);
  return id;
};

const list = (status = '') => {
  return status ? TaskManager.getTasksByStatus(status) : TaskManager.getTasks();
};

const clear = () => {
  return TaskManager.clear(), true;
};

export { add, remove, update, list, clear };
