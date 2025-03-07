export type CommandType = string;

export interface ICommand {
    readonly $type: CommandType;
}

/**
 * Interface for reversible commands
 */
export interface IReversibleCommand extends ICommand {
    // The undo command that will reverse this command's effects
    readonly $undoCommand: ICommand;
}