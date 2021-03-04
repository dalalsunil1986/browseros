interface CommandObject {
    readonly startsWith: string,
    readonly runner: (...args: string[]) => string
}

export class Command implements CommandObject {
    public startsWith: string
    public runner: (...args: string[]) => string

    constructor(object: CommandObject) {
        this.startsWith = object.startsWith
        this.runner = object.runner
    }

    run(command: string): string {
        return this.runner(...command.split(' '))
    }
}
