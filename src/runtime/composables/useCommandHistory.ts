/**
 * This file provides a composable function for accessing and managing command history.
 * It allows components to undo/redo commands and access history stacks.
 */
import { useCommandBus } from "./useCommandBus";

/**
 * A composable that provides access to the command history functionality.
 * 
 * @returns {Object} An object containing history stacks and methods for undo/redo operations
 */
export const useCommandHistory = () => {
    const { bus } = useCommandBus();

    return {
        /**
         * Stack of commands that can be undone
         */
        undoStack: bus.historyManager.undoStack,
        /**
         * Stack of commands that can be redone
         */
        redoStack: bus.historyManager.redoStack,
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
        canUndo: bus.historyManager.canUndo.bind(bus.historyManager),
        /**
         * Checks if redo operation is available
         */
        canRedo: bus.historyManager.canRedo.bind(bus.historyManager),
        /**
         * Clears the undo and redo stacks
         */
        clearHistory: bus.historyManager.clearHistory.bind(bus.historyManager),
    }
}