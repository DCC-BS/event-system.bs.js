import { CommandBus } from "../services/command-bus.js";
/**
 * Provides methods to interact with the command bus.
 *
 * @returns An object containing methods to register, unregister, and execute commands.
 */
export declare const useCommandBus: () => {
    /**
     * Registers a handler for a specific command type.
     *
     * @param commandType - The type of command to handle.
     * @param handler - The handler function to execute when the command is received.
     */
    registerHandler: <TCommand extends import("../models/commands").ICommand>(commandType: import("../models/commands").CommandType, handler: import("../services/command-bus").CommandHandler<TCommand>) => void;
    /**
     * Unregisters a handler for a specific command type.
     *
     * @param commandType - The type of command to stop handling.
     * @param handler - The handler function to remove.
     */
    unregisterHandler: <TCommand extends import("../models/commands").ICommand>(commandType: import("../models/commands").CommandType, handler: import("../services/command-bus").CommandHandler<TCommand>) => void;
    /**
     * Executes all handlers registered for the given command.
     *
     * @param command - The command to execute.
     */
    executeCommand: (command: import("../models/commands").ICommand, history?: boolean) => Promise<void>;
    /**
     * Gets the command bus.
     */
    bus: CommandBus;
    /**
     * Registers a command handler with automatic unregistration on component unmount.
     *
     * @param commandKey - The key of the command to handle.
     * @param callback - The handler function to execute when the command is received.
     */
    onCommand: <TCommand>(commandKey: string, callback: (command: TCommand) => Promise<void>) => void;
};
