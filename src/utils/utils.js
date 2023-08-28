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

export const areDatesTheSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();


export function toISOLocal(d) {
  var z  = n =>  ('0' + n).slice(-2);
  var zz = n => ('00' + n).slice(-3);
  var off = d.getTimezoneOffset();
  var sign = off > 0? '-' : '+';
  off = Math.abs(off);

  return d.getFullYear() + '-'
          + z(d.getMonth()+1) + '-' +
          z(d.getDate()) + 'T' +
          z(d.getHours()) + ':'  + 
          z(d.getMinutes()) + ':' +
          z(d.getSeconds()) + '.' +
          zz(d.getMilliseconds()) +
          sign + z(off/60|0) + ':' + z(off%60); 
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};