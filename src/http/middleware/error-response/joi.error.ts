import { ValidationError } from "joi";
import { BadRequest } from "./bad-request";

export class JoiError extends BadRequest {
  constructor(joiError: ValidationError) {
    super(joiError.message, joiError.details);
  }
}
