import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CommandHistoryManager } from '../src/runtime/services/command-history-manager';
import { CommandBus } from '../src/runtime/services/command-bus';
import type { IReversibleCommand } from '../src/runtime/models/commands';

// Mock Vue's ref and readonly functions
vi.mock('vue', () => ({
    ref: (val: any) => ({ value: val }),
    readonly: (val: any) => val
}));

describe('CommandHistoryManager', () => {
    // Test setup variables
    let commandBus: CommandBus;
    let historyManager: CommandHistoryManager;

    // Sample commands for testing
    const testCommand: IReversibleCommand = {
        $type: 'TestCommand',
        $undoCommand: {
            $type: 'UndoTestCommand'
        }
    };

    const anotherCommand: IReversibleCommand = {
        $type: 'AnotherCommand',
        $undoCommand: {
            $type: 'UndoAnotherCommand'
        }
    };

    beforeEach(() => {
        // Reset mocks and create new instances for each test
        vi.clearAllMocks();

        // Create a CommandBus with a mocked executeCommand method
        commandBus = new CommandBus();
        vi.spyOn(commandBus, 'executeCommand').mockImplementation(async () => { });

        // Create the history manager with the mocked command bus
        historyManager = new CommandHistoryManager(commandBus, 5);
    });

    it('should add commands to history', () => {
        // Add a command to history
        historyManager.addToHistory(testCommand);

        // Verify the command was added to the undo stack
        expect(historyManager.undoStack.value).toHaveLength(1);
        expect(historyManager.undoStack.value[0]).toBe(testCommand);
        expect(historyManager.redoStack.value).toHaveLength(0);
    });

    it('should clear redo stack when new command is added', () => {
        // Setup: Add a command and perform undo to populate redo stack
        historyManager.addToHistory(testCommand);
        historyManager.undo();

        // Verify redo stack is populated
        expect(historyManager.redoStack.value).toHaveLength(1);

        // Add a new command
        historyManager.addToHistory(anotherCommand);

        // Verify redo stack is cleared
        expect(historyManager.redoStack.value).toHaveLength(0);
    });

    it('should limit history size', () => {
        // Add more commands than the max history size
        for (let i = 0; i < 10; i++) {
            historyManager.addToHistory({
                ...testCommand,
                $type: `TestCommand${i}`
            });
        }

        // Verify history is limited to max size (5)
        expect(historyManager.undoStack.value).toHaveLength(5);
        // First commands should be removed, latest should be kept
        expect(historyManager.undoStack.value[0].$type).toBe('TestCommand5');
    });

    it('should perform undo correctly', async () => {
        // Add a command to history
        historyManager.addToHistory(testCommand);

        // Perform undo
        const result = await historyManager.undo();

        // Verify undo was successful
        expect(result).toBe(true);
        expect(historyManager.undoStack.value).toHaveLength(0);
        expect(historyManager.redoStack.value).toHaveLength(1);
        expect(historyManager.redoStack.value[0]).toBe(testCommand);

        // Verify undo command was executed
        expect(commandBus.executeCommand).toHaveBeenCalledWith(testCommand.$undoCommand, false);
    });

    it('should perform redo correctly', async () => {
        // Setup: Add a command and undo it
        historyManager.addToHistory(testCommand);
        await historyManager.undo();

        // Perform redo
        const result = await historyManager.redo();

        // Verify redo was successful
        expect(result).toBe(true);
        expect(historyManager.undoStack.value).toHaveLength(1);
        expect(historyManager.redoStack.value).toHaveLength(0);

        // Verify original command was re-executed
        expect(commandBus.executeCommand).toHaveBeenCalledWith(testCommand, false);
    });

    it('should return false when nothing to undo', async () => {
        // Try to undo with empty stack
        const result = await historyManager.undo();

        // Verify operation failed
        expect(result).toBe(false);
        expect(commandBus.executeCommand).not.toHaveBeenCalled();
    });

    it('should return false when nothing to redo', async () => {
        // Try to redo with empty stack
        const result = await historyManager.redo();

        // Verify operation failed
        expect(result).toBe(false);
        expect(commandBus.executeCommand).not.toHaveBeenCalled();
    });

    it('should check if can undo/redo', () => {
        // Initially both stacks are empty
        expect(historyManager.canUndo()).toBe(false);
        expect(historyManager.canRedo()).toBe(false);

        // Add a command
        historyManager.addToHistory(testCommand);
        expect(historyManager.canUndo()).toBe(true);
        expect(historyManager.canRedo()).toBe(false);

        // Undo the command
        historyManager.undo();
        expect(historyManager.canUndo()).toBe(false);
        expect(historyManager.canRedo()).toBe(true);
    });

    it('should clear history', () => {
        // Add commands to both stacks
        historyManager.addToHistory(testCommand);
        historyManager.addToHistory(anotherCommand);
        historyManager.undo();

        // Clear history
        historyManager.clearHistory();

        // Verify both stacks are empty
        expect(historyManager.undoStack.value).toHaveLength(0);
        expect(historyManager.redoStack.value).toHaveLength(0);
    });
});
