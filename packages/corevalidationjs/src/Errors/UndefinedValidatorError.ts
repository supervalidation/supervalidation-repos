export class UndefinedValidatorError extends Error {
  public validator: string;

  constructor(validator: string) {
    super(`[${validator}] - UNDEFINED VALIDATOR`);
    this.name = "UndefinedValidatorError";
    this.validator = validator;
  }
}
