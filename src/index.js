import {element, inputPrompt, terminal, userInput} from "./elements"
import {ps1} from './settings'

import 'normalize.css'
import './styles/main.css'
import {sanitizeText} from './utils';
import {handler} from './commands'

inputPrompt.textContent = ps1

userInput.addEventListener('submit', evt => {
    const value = sanitizeText(handler.run(element.value)).replaceAll('\n', '<br>') // Get command result and prevent XSS vulnerability
    terminal.insertAdjacentHTML('beforeend', `<p class="console">${value}</p>`) // Write output into HTML
    element.value = '' // Reset input field
    evt.preventDefault() // Prevent form submitting
})