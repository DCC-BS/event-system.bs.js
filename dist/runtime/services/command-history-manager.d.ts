import type { IReversibleCommand } from "../models/commands.js";
import type { CommandBus } from "./command-bus.js";
/**
 * CommandHistoryManager maintains undo and redo stacks for commands
 * and provides functionality to navigate command history.
 */
export declare class CommandHistoryManager {
    private readonly commandBus;
    private readonly maxHistorySize;
    private readonly _undoStack;
    private readonly _redoStack;
    canUndo: import("vue").ComputedRef<boolean>;
    canRedo: import("vue").ComputedRef<boolean>;
    get undoStack(): any;
    get redoStack(): any;
    /**
     * Creates a new CommandHistoryManager
     *
     * @param commandBus - The command bus to use for executing undo/redo commands
     * @param maxHistorySize - Optional maximum size for history stacks (default: 100)
     */
    constructor(commandBus: CommandBus, maxHistorySize?: number);
    /**
     * Adds a command to the history for potential undoing later
     *
     * @param command - The command to add to history
     */
    addToHistory(command: IReversibleCommand): void;
    /**
     * Undoes the most recent command in history if possible
     *
     * @returns Promise that resolves when the undo operation completes
     */
    undo(): Promise<boolean>;
    /**
     * Redoes the most recently undone command if possible
     *
     * @returns Promise that resolves when the redo operation completes
     */
    redo(): Promise<boolean>;
    /**
     * Clears all command history
     */
    clearHistory(): void;
}
