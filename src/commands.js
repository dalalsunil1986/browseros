import {terminal} from './elements'
import {Command} from './classes/Command'
import {CommandHandler} from './classes/CommandHandler'
import {startTime} from './settings'

const commands = {
    '': () => '', // Empty command
    clear: () => { // Clear the screen
        terminal.innerHTML = ''
        return ''
    },
    help: () => { // Command reference
        return ['Commands:',
            '* help - Show this manual',
            '* clear - Clear the screen',
            '* uptime - Display system uptime',
            '',
            'That is all for now :)`'].join('\n')
    },
    uptime: () => { // Display system uptime
        const delta = Date.now() - startTime
        const days = Math.floor(delta / 1000 / 60 / 60 / 24)
        const hours = Math.floor(delta / 1000 / 60 / 60 - days * 24)
        const minutes = Math.floor(delta / 1000 / 60 - hours * 60 - days * 60 * 24)
        const seconds = Math.floor(delta / 1000 - minutes * 60 - hours * 60 * 60 - days * 60 * 60 * 24)
        const milliseconds = Math.floor(delta - seconds * 1000 - minutes * 1000 * 60 - hours * 1000 * 60 * 60 - days * 1000 * 60 * 60 * 24)
        return `Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`
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
