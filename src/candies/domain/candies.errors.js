export class CandyNotFoundError extends Error {
    constructor (candyId) {
        const message = `Could not find candy with id : ${candyId}`
        super(message)
        this.name = 'CandyNotFoundError'
    }
}