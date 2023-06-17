export const camelize = (string) =>
  string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');

export const isEmailAddress = (value) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value);
};

export const isEmpty = (value) => value === '';

export const isWhiteSpace = (value) => value.match(/^ *$/) !== null;

export const hasWhiteSpace = (value) => value.indexOf(' ') >= 0;

export const isEmptyOrWhiteSpace = (value) => isEmpty(value) || isWhiteSpace(value);

export const convertToNullIfEmpty = (string) => (string === '' ? null : string);

export const truncateText = (value, limit) => {
  if (value.length <= limit) {
    return value;
  }

  const truncatedValue = value.slice(0, limit);

  return `${truncatedValue}...`;
};

export const containsString = (value, search, caseSensitive = false) => {
  if (!caseSensitive) {
    return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
  }

  return value.indexOf(search) > -1;
};

export const isAlphaOnly = (value) => {
  const reg = /^[a-zA-Z]+$/;
  return reg.test(value);
};

export const isAlphanumericalOnly = (value) => {
  const reg = /^[0-9a-zA-Z]+$/;
  return reg.test(value);
};

export const isNumericalOnly = (value) => {
  const reg = /^[0-9]+$/;
  return reg.test(value);
};

export const removeSpaces = (value) => value.replace(/\s/g, '');

export const format = (string, args) => {
  let formattedString = Object.assign(string);

  Object.entries(args).foreach(([key, value]) => {
    formattedString = formattedString.replace(`{${key}}`, value);
  });

  return formattedString;
};

export const capitaliseEachWord = (value) => value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1)
