import { ResponseError } from "./response-error";

export class InternalServerError extends ResponseError {
  constructor(message = "Internal server error", details = {}) {
    super(message, 500, details);
  }
}
