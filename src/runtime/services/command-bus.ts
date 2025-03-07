import type { CommandType, ICommand, IReversibleCommand } from "../models/commands";
import { CommandHistoryManager } from "./command-history-manager";

export type CommandHandler<TCommand extends ICommand> = (command: TCommand) => Promise<void>;

/**
 * CommandBus is responsible for registering, unregistering, and executing command handlers.
 */
export class CommandBus {
    private commandHandlers = {} as Record<CommandType, CommandHandler<ICommand>[]>;
    private readonly _historyManager = new CommandHistoryManager(this);

    public get historyManager() {
        return this._historyManager;
    }

    /**
     * Registers a handler for a specific command type.
     *
     * @param commandType - The type of command to handle.
     * @param handler - The handler function to execute when the command is received.
     */
    public registerHandler<TCommand extends ICommand>(commandType: CommandType, handler: CommandHandler<TCommand>) {
        this.commandHandlers[commandType] = this.commandHandlers[commandType] || [];
        this.commandHandlers[commandType].push(handler as CommandHandler<ICommand>);
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
            const index = handlers.findIndex(h => h === handler);
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
        const handlers = this.commandHandlers[command.$type];
        if (handlers) {
            for (const handler of handlers) {
                await handler(command);
            }

            // Add to history if it's a reversible command and implements IUndoCommand
            if (this._historyManager &&
                this.isReversibleCommand(command)) {
                this._historyManager.addToHistory(command);
            }
        }
    }

    /**
     * Type guard to check if a command is reversible
     * 
     * @param command - The command to check
     */
    private isReversibleCommand(command: ICommand): command is IReversibleCommand {
        return '$undoCommand' in command && command.$undoCommand !== undefined;
    }
}