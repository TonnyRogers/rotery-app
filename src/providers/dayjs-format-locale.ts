import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localizedFormat);
dayjs.locale('pt-br');
dayjs.extend(timezone);

function formatLocale(date: string | Date, format: string) {
  return dayjs(date).format(format);
}

const dayjsPlugins = dayjs;

export {formatLocale, dayjsPlugins};
