import { CommandBus } from "../services/command-bus.js";
import { onUnmounted } from "vue";
const _commandBus = new CommandBus();
export const useCommandBus = () => {
  const bus = _commandBus;
  const registredHandlers = [];
  function onCommand(commandKey, callback) {
    const castedCallback = callback;
    registredHandlers.push({ key: commandKey, handler: castedCallback });
    bus.registerHandler(commandKey, castedCallback);
  }
  onUnmounted(() => {
    for (const { key, handler } of registredHandlers) {
      bus.unregisterHandler(key, handler);
    }
  });
  return {
    /**
     * Registers a handler for a specific command type.
     *
     * @param commandType - The type of command to handle.
     * @param handler - The handler function to execute when the command is received.
     */
    registerHandler: bus.registerHandler.bind(bus),
    /**
     * Unregisters a handler for a specific command type.
     *
     * @param commandType - The type of command to stop handling.
     * @param handler - The handler function to remove.
     */
    unregisterHandler: bus.unregisterHandler.bind(bus),
    /**
     * Executes all handlers registered for the given command.
     *
     * @param command - The command to execute.
     */
    executeCommand: bus.executeCommand.bind(bus),
    /**
     * Gets the command bus.
     */
    bus: _commandBus,
    /**
     * Registers a command handler with automatic unregistration on component unmount.
     *
     * @param commandKey - The key of the command to handle.
     * @param callback - The handler function to execute when the command is received.
     */
    onCommand
  };
};
