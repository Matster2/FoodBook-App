import i18n from 'i18n';

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

export const getDayName = (date) => {  
  const t = i18n.t;
  
  const days = [
    t('common.date.days.sunday'),
    t('common.date.days.monday'),
    t('common.date.days.tuesday'),
    t('common.date.days.wednesday'),
    t('common.date.days.thursday'),
    t('common.date.days.friday'),
    t('common.date.days.saturday')
  ];

  return days[date.getDay()];
};

export const getMonthName = (date) => {
  const t = i18n.t;

  const months = [
    t('common.date.months.january'),
    t('common.date.months.february'),
    t('common.date.months.march'),
    t('common.date.months.april'),
    t('common.date.months.may'),
    t('common.date.months.june'),
    t('common.date.months.july'),
    t('common.date.months.august'),
    t('common.date.months.september'),
    t('common.date.months.october'),
    t('common.date.months.november'),
    t('common.date.months.december'),
  ];

  return months[date.getMonth()];
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

export const getFormattedTimeString = (totalMinutes) => {
  const t = i18n.t;

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const parts = []

  if (hours > 0) {
    parts.push(`${hours} h`)
  }

  if (mins > 0) {
    parts.push(mins > 1 ? `${mins} ${t('common.time.mins')}` : `${mins} ${t('common.time.min')}`)
  }

  return parts.join(" ");
}
