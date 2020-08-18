export class InvalidConstraintRulesError extends Error {
  constructor(property: string, rules: string) {
    super(`INVALID CONSTRAINT RULES - [property:${property}] [rules:${rules}]`);
    this.name = "InvalidConstraintRulesError";
  }
}
