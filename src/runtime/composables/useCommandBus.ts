import { CommandBus } from "../services/command-bus";

const commandBus = new CommandBus();

/**
 * Provides methods to interact with the command bus.
 *
 * @returns An object containing methods to register, unregister, and execute commands.
 */
export const useCommandBus = () => {
    const bus = commandBus;

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
        executeCommand: bus.executeCommand.bind(bus)
    }
}
