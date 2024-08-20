# Task Tracker CLI

## Overview

This project is a Command-Line Interface (CLI) application designed to manage tasks. It provides a simple way to add, update, delete, and list tasks, as well as mark them as in-progress or done. The tasks are persisted in a JSON file, allowing the data to be maintained between sessions.

## Features

- **Task Management**: Add new tasks, update existing ones, and delete tasks by their ID.
- **Task Status Tracking**: Mark tasks as "in-progress" or "done" to keep track of their completion status.
- **Task Listing**: List all tasks or filter them by status to see only the tasks that are pending, in progress, or completed.
- **Persistence**: Tasks are stored in a JSON file, ensuring that they persist between sessions.
- **Command Validation**: Each command validates its arguments before execution, ensuring that the correct input is provided.

## Installation

Clone the repository:

```bash
  git clone git@github.com:HajimeGit/ttcli.git
  cd ttcli
  npm install
```

## Usage/Examples

The CLI supports a variety of commands, each with its own set of arguments. Here are the available commands:

- add <description>: Adds a new task with the provided description.
- delete <id>: Deletes the task with the specified ID.
- update <id> <description>: Updates the task with the specified ID with a new description.
- mark-in-progress <id>: Marks the task with the specified ID as "in-progress".
- mark-done <id>: Marks the task with the specified ID as "done".
- list [status]: Lists all tasks, or filters tasks by the provided status (todo, in-progress, or done).
- clear: Clears all tasks from the list.

Example Commands:

- Add a new task:

```bash
node index.js add "Buy groceries"
```

- List all tasks:

```bash
node index.js list
```

- Mark a task as done:

```bash
node index.js mark-done 1
```

## Project Structure

- models/command.js: Defines the Command class and manages command registration and execution.
- models/task.js: Manages tasks, including adding, removing, and updating tasks.
- services/json-manager.js: Handles reading from and writing to the JSON file that stores tasks.
- utils/file-path.js: Provides the file path for the JSON file.
- utils/validation.js: Contains validation functions for command arguments.
- command-list.js: Registers all available commands in the CLI.
- command-processor.js: Processes the command-line input and executes the corresponding command.
- task-repository.js: Provides functions to interact with tasks, such as adding, removing, and listing tasks.

## Project Idea

- https://roadmap.sh/projects/task-tracker