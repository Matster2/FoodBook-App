export const isEmpty = (value) => value === '';

export const isWhiteSpace = (value) => value.match(/^ *$/) !== null;

export const isEmptyOrWhiteSpace = (value) => isEmpty(value) || isWhiteSpace(value);

export const isUndefined = (arg) => arg === undefined;

export const isNull = (arg) => arg === null;

export const isNullOrEmpty = (arg) => isNull(arg) || isEmpty(arg);

export const isNullOrUndefined = (arg) => isUndefined(arg) || isNull(arg);

export const convertToInt = (arg) => parseInt(arg, 10);

export const nestedCopy = (array) => JSON.parse(JSON.stringify(array));

export const isValidEmail = (email) =>
  email.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );

export const containsString = (value, search, caseSensitive = false) => {
  if (!caseSensitive) {
    return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
  }

  return value.indexOf(search) > -1;
};
