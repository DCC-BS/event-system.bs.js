# event-system.bs.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/DCC-BS/event-system.bs.js)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/DCC-BS/event-system.bs.js/publish.yml)
[![codecov](https://codecov.io/gh/DCC-BS/event-system.bs.js/graph/badge.svg?token=3PBNL8OR24)](https://codecov.io/gh/DCC-BS/event-system.bs.js)

`event-system.bs.js` is an package that provides a Command Bus for handling commands in your application. This package is designed to be used to manage and execute commands in a structured and efficient manner.

## Quick Setup

To install the module create a `.npmrc` next to your `package.json` file:

```txt
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@dcc-bs:registry=https://npm.pkg.github.com
```

Create a github [personal access token (classic)](https://github.com/settings/tokens/new) with `read:packages` permissions and add it to your `.env` file:

```txt
GITHUB_TOKEN='YOUR_TOKEN'
```

Install the module to your Nuxt application with:

```bash
bun x nuxi module add @dcc-bs/event-system.bs.js
```

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

## Release a new Version
Commit your changes and then:
```sh
bun release
```
