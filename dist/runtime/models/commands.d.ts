export type CommandType = string;
export interface ICommand {
    readonly $type: CommandType;
}
/**
 * Interface for reversible commands
 */
export interface IReversibleCommand extends ICommand {
    readonly $undoCommand: ICommand | undefined;
}
