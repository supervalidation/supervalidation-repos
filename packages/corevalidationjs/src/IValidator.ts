export interface IValidator<Rule = any, AttributeValue = any, Extension = any, Aggregate = { [key: string]: any; }> {
  message: (name: string, rules: Rule) => string;
  validate: (
    value: AttributeValue,
    rules: Rule,
    aggregate: Aggregate,
    ext: Extension,
  ) => boolean;
}
