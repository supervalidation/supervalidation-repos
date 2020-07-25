export interface IValidationResult {
  isValid: boolean;
  invalidAttributes?: {
    [attribute: string]: {
      [validator: string]: string;
    },
  } | string[];
}
