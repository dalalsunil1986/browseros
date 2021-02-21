export class Command {
    constructor(object) {
        this.startsWith = object.startsWith
        this.runner = object.runner
    }

    run(command) {
        return this.runner(...command.split(' '))
    }
}
