import { InvalidationsFlatter } from "../InvalidationFlatter";

const description = (invalidAttributes: { [key: string]: any; }) => InvalidationsFlatter(invalidAttributes).join(" | ");

export class FailedValidateError extends Error {
  invalidAttributes: { [key: string]: any; };
  description: string;

  constructor(invalidAttributes: { [key: string]: any; }) {
    super();

    this.name = "FailedValidateError";
    this.invalidAttributes = invalidAttributes;
    this.description = description(invalidAttributes);
    this.message = `INVALID CONSTRAINT -- ${this.description}`;
  }
}
