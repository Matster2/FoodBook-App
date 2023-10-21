import i18n from 'i18n';
import { lowercaseFirstLetter } from 'utils/stringUtils';

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

export const getFormattedTimeString = (totalMinutes) => {
  const t = i18n.t;

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const parts = []

  if (hours > 0) {
    parts.push(`${hours} h`)
  }

  if (mins > 0 || hours === 0) {
    parts.push(mins > 1 ? `${mins} ${t('common.time.mins')}` : `${mins} ${t('common.time.min')}`)
  }

  return parts.join(" ");
}

export const getMeasurementSystemTranslation = (measurementSystem) => {
  const t = i18n.t;
  return t(`types.unitOfMeasurement.measurementSystems.${lowercaseFirstLetter(measurementSystem)}`);
}

export const getDaysTranslation = (days) => {
  const t = i18n.t;

  return days === 1 ? t("common.words.day") : t("common.words.days");
}