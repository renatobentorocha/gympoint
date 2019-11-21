import formatRelative from 'date-fns/formatRelative';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { capitalizeFirstLetter } from './capitalize';

export function distanceToNow(date) {
  return capitalizeFirstLetter(
    formatRelative(parseISO(date), new Date(), {
      locale: pt,
    })
  );
}
