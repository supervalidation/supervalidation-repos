import { InvalidationsFlatter } from "../InvalidationFlatter";

export class FailedValidateError extends Error {
  invalidAttributes: any;

  constructor(invalidAttributes: { [key: string]: any; }) {
    super(`INVALID CONSTRAINT -- ${InvalidationsFlatter(invalidAttributes)}`);
    this.name = "FailedValidateError";
    this.invalidAttributes = invalidAttributes;
  }
}
