import {ResponseError} from "./response-error";

export class BadRequest extends ResponseError {
  constructor(message = "Bad request error", details = {}) {
    super(message, 400, details);
  }
}
