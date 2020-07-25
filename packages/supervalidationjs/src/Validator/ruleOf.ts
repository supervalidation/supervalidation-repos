import { IValidator } from "corevalidationjs";

export const ruleOf = <Rule>(validator: IValidator<Rule>) => (rule: Rule) => rule;
