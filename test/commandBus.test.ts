import { describe, it, expect } from 'vitest';
import type { ICommand } from '../src/runtime/models/commands';
import { CommandBus } from '../src/runtime/services/command-bus';


class TestCommand implements ICommand {
    readonly $type = "TestCommand";

    constructor(public readonly message: string) { }
}

describe('CommandBus', () => {
    it('should register a handler', async () => {
        const bus = new CommandBus();
        const handler = async (_: TestCommand) => { };

        bus.registerHandler("TestCommand", handler);

        expect(bus['commandHandlers']["TestCommand"]).toContain(handler);
    });

    it('should unregister a handler', async () => {
        const bus = new CommandBus();
        const handler = async (_: TestCommand) => { };

        bus.registerHandler("TestCommand", handler);
        bus.unregisterHandler("TestCommand", handler);

        expect(bus['commandHandlers']["TestCommand"]).not.toContain(handler);
    });

    it('should execute registered handlers', async () => {
        const bus = new CommandBus();
        const handledCommands: ICommand[] = [];
        const handler = async (command: TestCommand) => {
            handledCommands.push(command);
        };

        bus.registerHandler("TestCommand", handler);
        const command = new TestCommand("test message");
        await bus.executeCommand(command);

        expect(handledCommands).toContain(command);
    });

    it('should not execute unregistered handlers', async () => {
        const bus = new CommandBus();
        const handledCommands: ICommand[] = [];
        const handler = async (command: TestCommand) => {
            handledCommands.push(command);
        };

        bus.registerHandler("TestCommand", handler);
        bus.unregisterHandler("TestCommand", handler);
        const command = new TestCommand("test message");
        await bus.executeCommand(command);

        expect(handledCommands).not.toContain(command);
    });
});