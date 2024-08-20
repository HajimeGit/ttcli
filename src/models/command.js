import { initJsonManager, writeJsonFile } from '../services/json-manager.js';
import { TaskManager } from './task.js';

export class Command {
  constructor(keyword, validation, action) {
    this.keyword = keyword;
    this.action = action;
    this.validation = validation;
  }

  async execute(args) {
    if (!this.validation(args)) {
      return;
    }

    const jsonInitialized = await initJsonManager();
    if (!jsonInitialized) {
      return;
    }

    const executed = this.action(args);

    if (!executed) {
      return;
    }

    const fileWritten = await writeJsonFile(TaskManager.getTasks());
    if (!fileWritten) {
      return;
    }

    return console.log(executed);
  }
}

class CommandManagerClass {
  constructor() {
    this.commands = new Map();
  }

  addCommand(command) {
    this.commands.set(command.keyword, command);
  }

  removeCommand(command) {
    this.commands.delete(command.keyword);
  }

  defineCommands(list) {
    list.forEach((cmd) => this.addCommand(cmd));
  }

  getCommand(keyword) {
    return this.commands.get(keyword);
  }

  getCommandsKeywords() {
    return Array.from(this.commands.keys()).join(', ');
  }
}

export const CommandManager = new CommandManagerClass();
