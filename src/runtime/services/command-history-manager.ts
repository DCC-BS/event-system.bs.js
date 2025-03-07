import type { IReversibleCommand } from "../models/commands";
import { CommandBus } from "./command-bus";
import { ref } from "vue";

/**
 * CommandHistoryManager maintains undo and redo stacks for commands
 * and provides functionality to navigate command history.
 */
export class CommandHistoryManager {
    private readonly _undoStack: Ref<IReversibleCommand[]> = ref([]);
    private readonly _redoStack: Ref<IReversibleCommand[]> = ref([]);

    public get undoStack() {
        return readonly(this._undoStack);
    }

    public get redoStack() {
        return readonly(this._redoStack);
    }

    /**
     * Creates a new CommandHistoryManager
     * 
     * @param commandBus - The command bus to use for executing undo/redo commands
     * @param maxHistorySize - Optional maximum size for history stacks (default: 100)
     */
    constructor(
        private readonly commandBus: CommandBus,
        private readonly maxHistorySize: number = 100
    ) { }

    /**
     * Adds a command to the history for potential undoing later
     * 
     * @param command - The command to add to history
     */
    public addToHistory(command: IReversibleCommand): void {
        // Clear redo stack when new commands are executed
        this._redoStack.value = [];

        // Add command to undo stack
        this._undoStack.value.push(command);

        // Limit the size of the history
        if (this._undoStack.value.length > this.maxHistorySize) {
            this._undoStack.value.shift(); // Remove oldest command
        }
    }

    /**
     * Undoes the most recent command in history if possible
     * 
     * @returns Promise that resolves when the undo operation completes
     */
    public async undo(): Promise<boolean> {
        const command = this._undoStack.value.pop();

        if (!command?.$undoCommand) {
            return false; // Nothing to undo or command is not undoable
        }

        // Move the command to the redo stack
        this._redoStack.value.push(command);

        // Execute the undo command
        await this.commandBus.executeCommand(command.$undoCommand);

        return true;
    }

    /**
     * Redoes the most recently undone command if possible
     * 
     * @returns Promise that resolves when the redo operation completes
     */
    public async redo(): Promise<boolean> {
        const command = this._redoStack.value.pop();

        if (!command) {
            return false; // Nothing to redo
        }

        // Move the command back to the undo stack
        this._undoStack.value.push(command);

        // Re-execute the original command
        await this.commandBus.executeCommand(command);

        return true;
    }

    /**
     * Checks if undo operation is available
     */
    public canUndo(): boolean {
        return this._undoStack.value.length > 0;
    }

    /**
     * Checks if redo operation is available
     */
    public canRedo(): boolean {
        return this._redoStack.value.length > 0;
    }

    /**
     * Clears all command history
     */
    public clearHistory(): void {
        this._undoStack.value = [];
        this._redoStack.value = [];
    }
}
