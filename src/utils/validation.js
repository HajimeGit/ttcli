import { TASK_STATUSES } from '../models/task.js';

export const validateIdArgument = (args) => {
  const [id] = args;

  if (id === undefined || isNaN(id)) {
    console.error(
      'The second argument (id) for "delete" command is mantadory and must be number.'
    );
    return false;
  }

  return true;
};

export const validateStatus = (status) => {
  return TASK_STATUSES.includes(status);
};
