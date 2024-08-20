import { Command } from '../models/command.js';
import { TASK_DONE, TASK_IN_PROGRESS, TASK_STATUSES } from '../models/task.js';
import { validateIdArgument, validateStatus } from '../utils/validation.js';
import { add, remove, update, list, clear } from './task-repository.js';

const addCommand = new Command(
  'add',
  (args) => {
    const [description] = args;

    if (description === undefined) {
      console.error(
        'The second argument(description) for "add" command is mantadory.'
      );
      return false;
    }

    return true;
  },
  (args) => {
    const id = add(args[0]);
    return id ? `Task added successfully (ID: ${id})` : false;
  }
);

const deleteCommand = new Command(
  'delete',
  (args) => validateIdArgument(args),
  (args) => {
    const id = remove(args[0]);
    return remove(args[0]) ? `Task deleted successfully (ID: ${id})` : false;
  }
);

const updateCommand = new Command(
  'update',
  (args) => {
    const [id, description] = args;

    if (id === undefined || description === undefined) {
      console.error(
        'This command requires two arguments: "id" and "description".'
      );
    }

    if (isNaN(id)) {
      console.error('The "id" arguments must be a number.');
    }

    return true;
  },
  (args) => {
    const [id, description] = args;

    return update(id, 'description', description)
      ? `Task updated successfully (ID: ${id})`
      : false;
  }
);

const markInProgressCommand = new Command(
  'mark-in-progress',
  (args) => validateIdArgument(args),
  (args) => {
    const [id] = args;

    return update(id, 'status', TASK_IN_PROGRESS)
      ? `Task set 'in-progress' successfully (ID: ${id})`
      : false;
  }
);

const markDoneCommand = new Command(
  'mark-done',
  (args) => validateIdArgument(args),
  (args) => {
    const [id] = args;

    return update(id, 'status', TASK_DONE)
      ? `Task set 'done' successfully (ID: ${id})`
      : false;
  }
);

const listCommand = new Command(
  'list',
  (args) => {
    const [status] = args;

    if (status !== undefined) {
      if (validateStatus(status)) {
        return true;
      } else {
        console.error(
          `Task ${status} status is invalid, use one of the following: ${TASK_STATUSES.join(
            ', '
          )}`
        );

        return false;
      }
    }

    return true;
  },
  (args) => {
    const [status] = args;

    let tasks = status ? list(status) : list();

    if (tasks.length === 0) {
      return 'Tasks were not found.';
    }

    return `Here is the list of tasks: ${tasks.map(
      (task) =>
        `\nID: ${task.id}, description: ${task.description}, status: ${task.status}`
    )}`;
  }
);

const clearCommand = new Command(
  'clear',
  (args) => true,
  (args) => {
    return clear() ? `The task list has been cleared.` : false;
  }
);

export const commandList = [
  addCommand,
  deleteCommand,
  updateCommand,
  markInProgressCommand,
  markDoneCommand,
  listCommand,
  clearCommand,
];
