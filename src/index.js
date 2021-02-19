import {element, inputPrompt, terminal, userInput} from "./elements";
import {ps1} from './settings'

import 'normalize.css'
import './styles/main.css'

inputPrompt.textContent = ps1

userInput.addEventListener('submit', evt => {
    let value
    switch (element.value) {
        case '':
            value = '\n'
            break
        case 'clear':
            terminal.innerHTML = ''
            value = ''
            break
        case 'help':
            value = `Commands:
            * help - Show this manual
            * clear - Clear the screen
            That is all for now :)`
            break
        default:
            value = `Command "${element.value}" not found!`
    }

    value = value?.replaceAll('\n', '<br>')
    terminal.insertAdjacentHTML('beforeend', `<p class="console">${value ?? ''}</p>`)
    element.value = ''
    evt.preventDefault()
})