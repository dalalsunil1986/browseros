import 'normalize.css'
import './styles/main.css'

const username = 'user'
const hostname = 'browser'

const input = document.querySelector('.input-form')
const console = document.querySelector('.output')
const prompt = document.querySelector('.prompt')
prompt.textContent = `${username}@${hostname} $`

input.addEventListener('submit', evt => {
    const element = input.elements[0]
    window.console.log(element.value)

    let value
    switch (element.value) {
        case '':
            value = '\n'
            break
        case 'clear':
            console.innerHTML = ''
            value = ''
            break
        case 'help':
            value = `Commands:
            * help - Show this manual
            * clear - Clear the screen
            That is all for now :)`
            window.console.log(value)
            break
        default:
            value = `Command "${element.value}" not found!`
    }

    value = value?.replaceAll('\n', '<br>')
    console.insertAdjacentHTML('beforeend', `<p class="console">${value ?? ''}</p>`)
    element.value = ''
    evt.preventDefault()
})