# event-system.bs.js

![GitHub License](https://img.shields.io/github/license/DCC-BS/event-system.bs.js)
[![NPM Version](https://img.shields.io/npm/v/%40dcc-bs%2Fevent-system.bs.js)](https://www.npmjs.com/package/@dcc-bs/event-system.bs.js)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

`event-system.bs.js` is a package that provides a Command Bus for handling commands in your application. This package is designed to be used to manage and execute commands in a structured and efficient manner. It also supports **undo/redo** functionality for reversible commands.

## Quick Setup

Install the module to your Nuxt application with your preferred package manager:

```bash
# bun
bun add @dcc-bs/event-system.bs.js

# npm
npm install @dcc-bs/event-system.bs.js

# pnpm
pnpm add @dcc-bs/event-system.bs.js

# yarn
yarn add @dcc-bs/event-system.bs.js
```

Add the module to your nuxt.config.ts:

```ts
export default defineNuxtConfig({
  modules: [
    '@dcc-bs/event-system.bs.js'
  ]
})
```

That's it! You can now use event-system.bs.js in your Nuxt app ✨

## Usage

### Defining a Command

Commands are plain objects that implement the `ICommand` interface:

```ts
import type { ICommand } from '#build/types/commands';

class MyCommand implements ICommand {
    readonly $type = 'MyCommand';

    constructor(public myProperty: string) {}
}
```

### Registering a Command Handler

The recommended way to register a handler is via `onCommand`, which automatically unregisters the handler when the component unmounts:

```ts
const { onCommand, executeCommand } = useCommandBus();

onCommand<MyCommand>('MyCommand', async (command) => {
    // Handle the command
});

executeCommand(new MyCommand('prop value'));
```

Alternatively, you can manually register and unregister handlers using `registerHandler` / `unregisterHandler`:

```ts
const { registerHandler, unregisterHandler } = useCommandBus();

onMounted(() => {
    registerHandler('MyCommand', handleCommand);
});

onUnmounted(() => {
    unregisterHandler('MyCommand', handleCommand);
});

async function handleCommand(command: MyCommand) {
    // Handle the command
}
```

### Executing a Command

To execute a command, use the `executeCommand` method:

```ts
const { executeCommand } = useCommandBus();

executeCommand(new MyCommand('prop value'));
```

By default, executed commands that implement `IReversibleCommand` are automatically added to the command history. You can disable this by passing `false` as the second argument:

```ts
executeCommand(new MyCommand('prop value'), false);
```

## Undo / Redo (Command History)

Commands that implement the `IReversibleCommand` interface are automatically tracked in the command history, enabling undo and redo operations.

### Defining a Reversible Command

A reversible command includes an `$undoCommand` property that holds the command used to reverse its effect:

```ts
import type { IReversibleCommand } from '#build/types/commands';

class MyReversibleCommand implements IReversibleCommand {
    readonly $type = 'MyReversibleCommand';
    readonly $undoCommand: ICommand | undefined;

    constructor(public myProperty: string, undoCommand?: ICommand) {
        this.$undoCommand = undoCommand;
    }
}
```

### Using the Command History

Use the `useCommandHistory` composable to access undo/redo functionality:

```ts
const {
    undoStack,
    redoStack,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
} = useCommandHistory();

// Undo the most recent command
await undo();

// Redo the most recently undone command
await redo();

// Clear all history
clearHistory();
```

| Property / Method | Description |
| --- | --- |
| `undoStack` | Read-only stack of commands that can be undone |
| `redoStack` | Read-only stack of commands that can be redone |
| `undo()` | Undoes the most recent command |
| `redo()` | Redoes the most recently undone command |
| `canUndo` | Computed boolean indicating whether undo is available |
| `canRedo` | Computed boolean indicating whether redo is available |
| `clearHistory()` | Clears the undo and redo stacks |
