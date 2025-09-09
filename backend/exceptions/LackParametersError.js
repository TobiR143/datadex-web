export class LackParametersError extends Error {
    constructor(message) {
        super(message);
        this.name = "LackParametersError";
        this.status = 400; 
    }
}