import {terminal} from './elements'
import {Command} from './classes/Command'
import {CommandHandler} from './classes/CommandHandler'

const commands = {
    '': () => '', // Empty command
    clear: () => { // Clear the screen
        terminal.innerHTML = ''
        return ''
    },
    help: () => { // Command reference
        return `Commands:
            * help - Show this manual
            * clear - Clear the screen
            That is all for now :)`
    }
}

const commandObjects = []

for (const [key, value] of Object.entries(commands)) {
    commandObjects.push(new Command({
        startsWith: key,
        runner: value
    }))
}

export const handler = new CommandHandler(commandObjects)
