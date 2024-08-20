import { CommandManager } from '../models/command.js';
import { commandList } from './command-list.js';

const processCommand = (argv) => {
  argv = argv.splice(2);

  const keyword = argv[0];

  if (keyword === undefined) {
    return console.error('You must put at least one argument to use this CLI.');
  }

  CommandManager.defineCommands(commandList);

  const command = CommandManager.getCommand(keyword);

  if (command === undefined) {
    return console.error(
      `The command ${keyword} was not found. Here is the list of available commands: ${CommandManager.getCommandsKeywords()}`
    );
  }

  command.execute(argv.splice(1));
};

export default processCommand;
