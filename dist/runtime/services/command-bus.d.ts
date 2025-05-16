import type { CommandType, ICommand } from "../models/commands.js";
import { CommandHistoryManager } from "./command-history-manager.js";
export type CommandHandler<TCommand extends ICommand> = (command: TCommand) => Promise<void>;
/**
 * CommandBus is responsible for registering, unregistering, and executing command handlers.
 */
export declare class CommandBus {
    private commandHandlers;
    private readonly _historyManager;
    get historyManager(): CommandHistoryManager;
    /**
     * Registers a handler for a specific command type.
     *
     * @param commandType - The type of command to handle.
     * @param handler - The handler function to execute when the command is received.
     */
    registerHandler<TCommand extends ICommand>(commandType: CommandType, handler: CommandHandler<TCommand>): void;
    /**
     * Unregisters a handler for a specific command type.
     *
     * @param commandType - The type of command to stop handling.
     * @param handler - The handler function to remove.
     */
    unregisterHandler<TCommand extends ICommand>(commandType: CommandType, handler: CommandHandler<TCommand>): void;
    /**
     * Executes all handlers registered for the given command.
     *
     * @param command - The command to execute.
     */
    executeCommand(command: ICommand, history?: boolean): Promise<void>;
    /**
     * Type guard to check if a command is reversible
     *
     * @param command - The command to check
     */
    private isReversibleCommand;
}
