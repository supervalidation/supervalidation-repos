import { IValidator, IValidatorOptions } from "corevalidationjs";

export const rulesOf = <Rules>(validator: IValidator<Rules>) => (options: IValidatorOptions) => options;
