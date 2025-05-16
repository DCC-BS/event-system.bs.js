/**
 * This file provides a composable function for accessing and managing command history.
 * It allows components to undo/redo commands and access history stacks.
 */
import type { IReversibleCommand } from "../models/commands.js";
/**
 * A composable that provides access to the command history functionality.
 *
 * @returns {object} An object containing history stacks and methods for undo/redo operations
 */
export declare const useCommandHistory: () => {
    /**
     * Stack of commands that can be undone
     */
    undoStack: Ref<IReversibleCommand[]>;
    /**
     * Stack of commands that can be redone
     */
    redoStack: Ref<IReversibleCommand[]>;
    /**
     * Undoes the most recent command in the history
     */
    undo: () => Promise<boolean>;
    /**
     * Redoes the most recently undone command
     */
    redo: () => Promise<boolean>;
    /**
     * Checks if undo operation is available
     */
    canUndo: import("@vue/reactivity").ComputedRef<boolean>;
    /**
     * Checks if redo operation is available
     */
    canRedo: import("@vue/reactivity").ComputedRef<boolean>;
    /**
     * Clears the undo and redo stacks
     */
    clearHistory: () => void;
};
