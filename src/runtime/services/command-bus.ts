import type { CommandType, ICommand } from "../models/commands";

export type CommandHandler<TCommand extends ICommand> = (command: TCommand) => Promise<void>;

/**
 * CommandBus is responsible for registering, unregistering, and executing command handlers.
 */
export class CommandBus {
    private commandHandlers = {} as Record<CommandType, CommandHandler<ICommand>[]>;

    /**
     * Registers a handler for a specific command type.
     *
     * @param commandType - The type of command to handle.
     * @param handler - The handler function to execute when the command is received.
     */
    public registerHandler<TCommand extends ICommand>(commandType: CommandType, handler: CommandHandler<TCommand>) {
        this.commandHandlers[commandType] = this.commandHandlers[commandType] || [];
        this.commandHandlers[commandType].push(handler);
    }

    /**
     * Unregisters a handler for a specific command type.
     *
     * @param commandType - The type of command to stop handling.
     * @param handler - The handler function to remove.
     */
    public unregisterHandler<TCommand extends ICommand>(commandType: CommandType, handler: CommandHandler<TCommand>) {
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
    public async executeCommand(command: ICommand) {
        const handlers = this.commandHandlers[command.$type] as CommandHandler<ICommand>[];
        if (handlers) {
            for (const handler of handlers) {
                await handler(command);
            }
        }
    }
}