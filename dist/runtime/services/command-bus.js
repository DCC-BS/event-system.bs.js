export class CommandBus {
  commandHandlers = {};
  /**
   * Registers a handler for a specific command type.
   *
   * @param commandType - The type of command to handle.
   * @param handler - The handler function to execute when the command is received.
   */
  registerHandler(commandType, handler) {
    this.commandHandlers[commandType] = this.commandHandlers[commandType] || [];
    this.commandHandlers[commandType].push(handler);
  }
  /**
   * Unregisters a handler for a specific command type.
   *
   * @param commandType - The type of command to stop handling.
   * @param handler - The handler function to remove.
   */
  unregisterHandler(commandType, handler) {
    const handlers = this.commandHandlers[commandType];
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index >= 0) {
        handlers.splice(index, 1);
      }
    }
  }
  /**
   * Executes all handlers registered for the given command.
   *
   * @param command - The command to execute.
   */
  async executeCommand(command) {
    const handlers = this.commandHandlers[command.$type];
    if (handlers) {
      for (const handler of handlers) {
        await handler(command);
      }
    }
  }
}
