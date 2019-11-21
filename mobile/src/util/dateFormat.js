import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export function distanceToNow(date) {
  return formatDistanceToNow(parseISO(date), {
    addSuffix: true,
    locale: pt,
  });
}
