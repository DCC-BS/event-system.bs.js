import { describe, it, expect, vi } from 'vitest';
import { useCommandBus } from '../src/runtime/composables/useCommandBus';
import type { ICommand } from '../src/runtime/models/commands';

class TestCommand implements ICommand {
    readonly $type = "TestCommand";

    constructor(public readonly message: string) { }
}

describe('useCommandBus', () => {
    it('should execute registered handlers', async () => {
        // arrange
        const { registerHandler, executeCommand } = useCommandBus();
        const expectedCommand = new TestCommand("test message");
        const mockHandler = vi.fn(async (_: TestCommand) => { });

        // act
        registerHandler("TestCommand", mockHandler);
        executeCommand(expectedCommand);

        // assert
        expect(mockHandler).toHaveBeenCalledWith(expectedCommand);
    });

    it('should not execute unregistered handlers', async () => {
        // arrange
        const { registerHandler, unregisterHandler } = useCommandBus();
        const mockHandler = vi.fn(async (_: TestCommand) => { });

        // act
        registerHandler("TestCommand", mockHandler);
        unregisterHandler("TestCommand", mockHandler);

        // assert
        expect(mockHandler).not.toHaveBeenCalled();
    });
});
