/**
 * This file provides a composable function for accessing and managing command history.
 * It allows components to undo/redo commands and access history stacks.
 */
import type { IReversibleCommand } from "../models/commands";
import { useCommandBus } from "./useCommandBus";

/**
 * A composable that provides access to the command history functionality.
 * 
 * @returns {object} An object containing history stacks and methods for undo/redo operations
 */
export const useCommandHistory = () => {
    const { bus } = useCommandBus();

    return {
        /**
         * Stack of commands that can be undone
         */
        undoStack: bus.historyManager.undoStack as Ref<IReversibleCommand[]>,
        /**
         * Stack of commands that can be redone
         */
        redoStack: bus.historyManager.redoStack as Ref<IReversibleCommand[]>,
        /**
         * Undoes the most recent command in the history
         */
        undo: bus.historyManager.undo.bind(bus.historyManager),
        /**
         * Redoes the most recently undone command
         */
        redo: bus.historyManager.redo.bind(bus.historyManager),
        /**
         * Checks if undo operation is available
         */
        canUndo: bus.historyManager.canUndo,
        /**
         * Checks if redo operation is available
         */
        canRedo: bus.historyManager.canRedo,
        /**
         * Clears the undo and redo stacks
         */
        clearHistory: bus.historyManager.clearHistory.bind(bus.historyManager),
    }
}