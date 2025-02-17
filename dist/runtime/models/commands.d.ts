export type CommandType = string;
export interface ICommand {
    readonly $type: CommandType;
}
