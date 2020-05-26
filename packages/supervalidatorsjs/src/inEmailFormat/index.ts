import { IValidator } from "corevalidationjs";
import { isNullOrUndefined } from "util";

export type inEmailFormatRules = "*" | {
  domain: string | RegExp;
};

export const inEmailFormat: IValidator<inEmailFormatRules, string> = {
  message: (name, rules) => {
    let textRules = "*";

    if (typeof rules === "string") {
      textRules = rules;
    } else if (typeof rules.domain === "string") {
      textRules = rules.domain;
    }

    if (textRules === "*") {
      return `[${name}] must be in email format.`;
    } else {
      return `[${name}] must be in email format [domain: ${textRules}].`;
    }
  },
  validate: (value, rules) => {
    if (isNullOrUndefined(value)) {
      return true;
    }

    const format = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const isEmail = format.test(value);

    if (isEmail) {
      let textRules = "*";
      let regexRules: RegExp | undefined;

      if (typeof rules === "string") {
        textRules = rules;
      } else if (typeof rules.domain === "string") {
        textRules = rules.domain;
      } else {
        regexRules = rules.domain;
      }

      const domain = value.split("@").pop();

      if (regexRules && domain) {
        return regexRules.test(domain);
      } else if (textRules === "*") {
        return true;
      } else {
        return domain === textRules;
      }
    } else {
      return false;
    }
  },
};
