export function CurrencyFormat(value = 0, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

export function RemoveCurrencySign(value, locale = 'pt-BR') {
  if (locale === 'pt-BR') {
    return `${value}`.replace(/,/g, '.').replace(/[^0-9.]/g, '');
  }

  return `${value}`.replace(/[^0-9.]/g, '');
}

export function OnlyNumber(value) {
  return `${value}`.replace(/[^0-9]/g, '');
}

export function ToDecimal(value) {
  const number = OnlyNumber(value);

  let result = number;

  if (number.length >= 3) {
    const decimal = number.substr(number.length - 2);
    const integer = number.substr(0, number.length - 2);

    result = (parseFloat(integer) + Number(decimal) / 100).toFixed(2);
  }

  return result;
}
