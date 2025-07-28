import { ref, readonly, computed } from "vue";
export class CommandHistoryManager {
  /**
   * Creates a new CommandHistoryManager
   * 
   * @param commandBus - The command bus to use for executing undo/redo commands
   * @param maxHistorySize - Optional maximum size for history stacks (default: 100)
   */
  constructor(commandBus, maxHistorySize = 100) {
    this.commandBus = commandBus;
    this.maxHistorySize = maxHistorySize;
  }
  _undoStack = ref([]);
  _redoStack = ref([]);
  canUndo = computed(() => this._undoStack.value.length > 0);
  canRedo = computed(() => this._redoStack.value.length > 0);
  get undoStack() {
    return readonly(this._undoStack);
  }
  get redoStack() {
    return readonly(this._redoStack);
  }
  /**
   * Adds a command to the history for potential undoing later
   * 
   * @param command - The command to add to history
   */
  addToHistory(command) {
    this._redoStack.value = [];
    this._undoStack.value.push(command);
    if (this._undoStack.value.length > this.maxHistorySize) {
      this._undoStack.value.shift();
    }
  }
  /**
   * Undoes the most recent command in history if possible
   * 
   * @returns Promise that resolves when the undo operation completes
   */
  async undo() {
    const command = this._undoStack.value.pop();
    if (!command?.$undoCommand) {
      return false;
    }
    this._redoStack.value.push(command);
    await this.commandBus.executeCommand(command.$undoCommand, false);
    return true;
  }
  /**
   * Redoes the most recently undone command if possible
   * 
   * @returns Promise that resolves when the redo operation completes
   */
  async redo() {
    const command = this._redoStack.value.pop();
    if (!command) {
      return false;
    }
    this._undoStack.value.push(command);
    await this.commandBus.executeCommand(command, false);
    return true;
  }
  /**
   * Clears all command history
   */
  clearHistory() {
    this._undoStack.value = [];
    this._redoStack.value = [];
  }
}
