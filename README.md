# event-system.bs.js

![GitHub License](https://img.shields.io/github/license/DCC-BS/event-system.bs.js)
[![NPM Version](https://img.shields.io/npm/v/%40dcc-bs%2Fevent-system.bs.js)](https://www.npmjs.com/package/@dcc-bs/event-system.bs.js)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

`event-system.bs.js` is an package that provides a Command Bus for handling commands in your application. This package is designed to be used to manage and execute commands in a structured and efficient manner.

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
````

That's it! You can now use event-system.bs.js in your Nuxt app ✨

## Usage
### Registering a Command Handler
To register a command handler, use the registerHandler method use the `useCommandBus` composable:

```ts
import type { ICommand } from "#build/types/commands";

class MyCommand implements ICommand {
    readonly $type = "MyCommand";

    constructor(
        public myProperty: string) {
    }
}


const { registerHandler, unregisterHandler } = useCommandBus();

onMounted(() =>{
    registerHandler('MyCommand', handleCommand);
});

onUnmounted(() =>{
    unregisterHandler('MyCommand', handleCommand);
});

async function handleCommand(command: MyCommand){ 
    // Handle the commadn
}
```


## Executing a Command
To execute a command, use the executeCommand method:

```ts
const { executeCommand } = useCommandBus();

executeCommand(new MyCommand('prop value'));
```
