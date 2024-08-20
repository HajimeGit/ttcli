import { writeFile, readFile, access, constants } from 'fs/promises';
import { getJsonFilePath } from '../utils/file-path.js';
import { TaskManager } from '../models/task.js';

export const initJsonManager = async () => {
  const filePath = getJsonFilePath();

  try {
    // Check if the json file exists.
    await access(filePath, constants.F_OK);

    try {
      // Read json file data.
      const tasksData = await readFile(filePath, 'utf-8');
      TaskManager.setTasks(tasksData);
    } catch (err) {
      console.error('Error reading the file or parsing JSON:', err);
      return false;
    }

    return true;
    // Thrown when json file does not exists.
  } catch (err) {
    try {
      await writeFile(filePath, JSON.stringify([]));
      console.log(`File created successfully: ${filePath}`);
      return true;
    } catch (writeErr) {
      console.error('Error creating the file:', writeErr);
      return false;
    }
  }
};

export const writeJsonFile = async (data) => {
  try {
    await writeFile(getJsonFilePath(), JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
