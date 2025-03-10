import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommandBus } from '../src/runtime/services/command-bus';
import type { ICommand, IReversibleCommand } from '../src/runtime/models/commands';

// Mock Vue's ref and readonly functions
vi.mock('vue', () => ({
    ref: (val: unknown) => ({ value: val }),
    readonly: (val: unknown) => val
}));

describe('Command History Integration Tests', () => {
    let commandBus: CommandBus;
    let handlerSpy: (c: ICommand) => Promise<void>;

    // Sample reversible command for testing
    const reversibleCommand: IReversibleCommand = {
        $type: 'TestCommand',
        $undoCommand: {
            $type: 'UndoTestCommand',
        }
    };

    beforeEach(() => {
        // Create a fresh command bus for each test
        commandBus = new CommandBus();

        // Create a spy to track command handler calls
        handlerSpy = vi.fn();

        // Register handlers for our test commands
        commandBus.registerHandler('TestCommand', handlerSpy);
        commandBus.registerHandler('UndoTestCommand', handlerSpy);
    });

    it('should add reversible commands to history when executed', async () => {
        // Execute a reversible command
        await commandBus.executeCommand(reversibleCommand);

        // Verify the command handler was called
        expect(handlerSpy).toHaveBeenCalledWith(reversibleCommand);

        // Verify the command was added to history
        expect(commandBus.historyManager.undoStack.value).toHaveLength(1);
        expect(commandBus.historyManager.undoStack.value[0]).toBe(reversibleCommand);
    });

    it('should execute undo command when undo is called', async () => {
        // Execute a reversible command
        await commandBus.executeCommand(reversibleCommand);

        // Reset the spy to track only the undo call
        handlerSpy.mockReset();

        // Call undo
        await commandBus.historyManager.undo();

        // Verify the undo command was executed
        expect(handlerSpy).toHaveBeenCalledWith(reversibleCommand.$undoCommand);

        // Verify the command was moved to the redo stack
        expect(commandBus.historyManager.undoStack.value).toHaveLength(0);
        expect(commandBus.historyManager.redoStack.value).toHaveLength(1);
    });

    it('should re-execute original command when redo is called', async () => {
        // Execute a reversible command and then undo it
        await commandBus.executeCommand(reversibleCommand);
        await commandBus.historyManager.undo();

        // Reset the spy to track only the redo call
        handlerSpy.mockReset();

        // Call redo
        await commandBus.historyManager.redo();

        // Verify the original command was re-executed
        expect(handlerSpy).toHaveBeenCalledWith(reversibleCommand);

        // Verify the command was moved back to the undo stack
        expect(commandBus.historyManager.undoStack.value).toHaveLength(1);
        expect(commandBus.historyManager.redoStack.value).toHaveLength(0);
    });

    it('should not add non-reversible commands to history', async () => {
        // Create a non-reversible command (no $undoCommand)
        const normalCommand = {
            $type: 'NormalCommand',
            payload: { value: 'normal' }
        };

        // Register handler for normal command
        commandBus.registerHandler('NormalCommand', handlerSpy);

        // Execute the normal command
        await commandBus.executeCommand(normalCommand);

        // Verify the command was executed but not added to history
        expect(handlerSpy).toHaveBeenCalledWith(normalCommand);
        expect(commandBus.historyManager.undoStack.value).toHaveLength(0);
    });

    it('should maintain correct history after multiple operations', async () => {
        // Create multiple commands
        const command1 = { ...reversibleCommand, $type: 'Command1' };
        const command2 = { ...reversibleCommand, $type: 'Command2' };

        // Register handlers
        commandBus.registerHandler('Command1', handlerSpy);
        commandBus.registerHandler('Command2', handlerSpy);
        commandBus.registerHandler(command1.$undoCommand.$type, handlerSpy);
        commandBus.registerHandler(command2.$undoCommand.$type, handlerSpy);

        // Execute commands and perform undo/redo operations
        await commandBus.executeCommand(command1);
        await commandBus.executeCommand(command2);
        await commandBus.historyManager.undo(); // Undo command2

        // Verify state after operations
        expect(commandBus.historyManager.undoStack.value).toHaveLength(1);
        expect(commandBus.historyManager.undoStack.value[0].$type).toBe('Command1');
        expect(commandBus.historyManager.redoStack.value).toHaveLength(1);
        expect(commandBus.historyManager.redoStack.value[0].$type).toBe('Command2');

        // Execute a new command - should clear redo stack
        const command3 = { ...reversibleCommand, $type: 'Command3' };
        commandBus.registerHandler('Command3', handlerSpy);
        await commandBus.executeCommand(command3);

        // Verify redo stack was cleared and new command added to undo stack
        expect(commandBus.historyManager.undoStack.value).toHaveLength(2);
        expect(commandBus.historyManager.undoStack.value[1].$type).toBe('Command3');
        expect(commandBus.historyManager.redoStack.value).toHaveLength(0);
    });
});
