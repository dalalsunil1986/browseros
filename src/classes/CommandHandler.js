import {Command} from './Command'

export class CommandHandler {
    constructor(commands) {
        this.commands = commands
    }

    add(command) {
        if (typeof command === 'object' && command instanceof Command) // If command is prototype of Command class
            this.commands.push(command)
        else
            throw new Error('Incorrect type of command')
    }

    run(value) {
        const first = value.split(' ', 1)[0]

        let out
        this.commands.forEach(command => {
            if (command.startsWith === first)
                out = command.run(value)
        })

        if (out)
            return out
        else
            return `Command "${first}" not found!`
    }
}
