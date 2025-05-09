# Changelog

## v1.2.0

[compare changes](https://github.com/DCC-BS/event-system.bs.js/compare/v1.1.1...v1.2.0)

### 🚀 Enhancements

- Add onCommand method for registering command handlers with automatic unregistration on component unmount ([ed7e5fa](https://github.com/DCC-BS/event-system.bs.js/commit/ed7e5fa))

### 🩹 Fixes

- Enhance command history management by using computed properties for canUndo and canRedo, and improve type safety for undo/redo stacks ([24d5ccd](https://github.com/DCC-BS/event-system.bs.js/commit/24d5ccd))

### 🏡 Chore

- **release:** V1.1.1 ([7ecf75e](https://github.com/DCC-BS/event-system.bs.js/commit/7ecf75e))

### ❤️ Contributors

- Tobias Bollinger <tobias.bollinger@bs.ch>

## v1.1.1

[compare changes](https://github.com/DCC-BS/event-system.bs.js/compare/v1.1.0...v1.1.1)

### 🩹 Fixes

- Update publish workflow to use 'bun run test' for running tests ([b3a74ed](https://github.com/DCC-BS/event-system.bs.js/commit/b3a74ed))
- Simplify canUndo and canRedo methods and update command history state management ([a90957b](https://github.com/DCC-BS/event-system.bs.js/commit/a90957b))
- Correct method name from updateCanUndoReod to updateCanUndoRedo and ensure proper state updates in command history ([cf3879c](https://github.com/DCC-BS/event-system.bs.js/commit/cf3879c))

### ❤️ Contributors

- Tobias Bollinger <tobias.bollinger@gmail.com>

## v1.1.0

[compare changes](https://github.com/DCC-BS/event-system.bs.js/compare/v1.0.3...v1.1.0)

### 🚀 Enhancements

- Implement command history management with undo/redo functionality ([ea91f69](https://github.com/DCC-BS/event-system.bs.js/commit/ea91f69))
- Enhance command execution to support optional history tracking ([e2c5291](https://github.com/DCC-BS/event-system.bs.js/commit/e2c5291))

### 🩹 Fixes

- Update release script to use 'bun run test' and improve type annotations in command history files ([850d805](https://github.com/DCC-BS/event-system.bs.js/commit/850d805))

### 📖 Documentation

- Add Codecov badge to README ([253f8c0](https://github.com/DCC-BS/event-system.bs.js/commit/253f8c0))

### 🏡 Chore

- Add CI workflow for package publishing and testing ([4902931](https://github.com/DCC-BS/event-system.bs.js/commit/4902931))
- Update CI configuration and add Vitest coverage support ([1c9e7c0](https://github.com/DCC-BS/event-system.bs.js/commit/1c9e7c0))
- Add Codecov configuration file for coverage reporting ([eceb6c6](https://github.com/DCC-BS/event-system.bs.js/commit/eceb6c6))

### ❤️ Contributors

- Tobias Bollinger <tobias.bollinger@gmail.com>

## v1.0.3

[compare changes](https://github.com/DCC-BS/event-system.bs.js/compare/remove...v1.0.3)

### 🏡 Chore

- Release instructions to README ([a09de62](https://github.com/DCC-BS/event-system.bs.js/commit/a09de62))

### ❤️ Contributors

- Tobias Bollinger <tobias.bollinger@gmail.com>

## v1.0.2

## v1.0.1