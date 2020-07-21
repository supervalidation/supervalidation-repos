export const InvalidationsFlatter = (
  invalidAttributes: { [key: string]: any; },
  initialInvalidMessages: string[] = [],
) => flatInvalidations(invalidAttributes, initialInvalidMessages);

const flatInvalidations = (invalidAttributes: { [key: string]: any; }, invalidMessages: string[]) =>
  Object.keys(invalidAttributes).reduce((result, key) => {
    const value = invalidAttributes[key];

    if (typeof value === "string") {
      result.push(value);
    } else {
      result = flatInvalidations(value, result);
    }

    return result;
  }, invalidMessages);
