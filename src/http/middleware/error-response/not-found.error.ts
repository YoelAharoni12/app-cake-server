import {ResponseError} from "./response-error";

export class NotFoundError extends ResponseError{
    constructor(message = 'Not Found Error', details = {}) {
        super(message,404,details);
    }
}