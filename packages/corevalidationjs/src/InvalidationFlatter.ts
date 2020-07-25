export const InvalidationsFlatter = (
  invalidAttributes: { [key: string]: any; },
  initial: string[] = [],
) => flatInvalidations(invalidAttributes, initial);

const flatInvalidations = (invalidAttributes: { [key: string]: any; }, initial: string[]) =>
  Object.keys(invalidAttributes).reduce((result, key) => {
    const value = invalidAttributes[key];

    if (typeof value === "string") {
      if (result.indexOf(value) === -1) {
        result.push(value);
      }
    } else {
      result = flatInvalidations(value, result);
    }

    return result;
  }, initial);
