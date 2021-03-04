import {Command} from './Command'

export class CommandHandler {
    public commands: Command[]

    constructor(commands: Command[]) {
        this.commands = commands
    }

    add(command: Command): void {// If command is prototype of Command class
        this.commands.push(command)
    }

    run(value: string): string {
        const first = value.split(' ', 1)[0]

        let out: string | undefined
        this.commands.forEach(command => {
            if (command.startsWith === first)
                out = command.run(value)
        })

        if (typeof out !== 'undefined')
            return out
        else
            return `Command "${first}" not found! Use "help" for command reference.`
    }
}
