export class UnauthorizedError {
    constructor(data, status) {
        this.data = data
        this.status = status
    }
}