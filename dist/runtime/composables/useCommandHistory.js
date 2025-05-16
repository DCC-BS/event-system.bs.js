import { useCommandBus } from "./useCommandBus.js";
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
    canUndo: bus.historyManager.canUndo,
    /**
     * Checks if redo operation is available
     */
    canRedo: bus.historyManager.canRedo,
    /**
     * Clears the undo and redo stacks
     */
    clearHistory: bus.historyManager.clearHistory.bind(bus.historyManager)
  };
};
