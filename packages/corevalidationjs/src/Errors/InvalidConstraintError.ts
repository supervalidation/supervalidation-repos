export class InvalidConstraintError extends Error {
  constructor() {
    super("INVALID CONSTRAINT");
    this.name = "InvalidConstraintError";
  }
}
