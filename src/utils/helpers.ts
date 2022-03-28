export const toDateTimeZone = (date: string): Date => {
  // const timezoneName = RNLocalize.getTimeZone();
  // const zonedDate = addHours(zonedTimeToUtc(date, timezoneName), 3);
  // return zonedDate;
  const serverDateTime = new Date(`${date.replace(' ', 'T')}`);
  const serverOffset = 10800000;
  const ONE_MINUTE = 60 * 1000;
  const localOffset = new Date().getTimezoneOffset() * ONE_MINUTE;
  const localDate = new Date(
    serverDateTime.getTime() - serverOffset + localOffset + localOffset,
  );
  return localDate;
};
