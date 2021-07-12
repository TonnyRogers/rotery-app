import {zonedTimeToUtc} from 'date-fns-tz';
import * as RNLocalize from 'react-native-localize';
import {addHours} from 'date-fns';

export const toDateTimeZone = (date: string | Date): Date => {
  const timezoneName = RNLocalize.getTimeZone();
  const zonedDate = addHours(zonedTimeToUtc(date, timezoneName), 3);

  return zonedDate;
};
