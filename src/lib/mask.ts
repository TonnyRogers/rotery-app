export function formatBRL(value: string) {
  if (!value) {
    return;
  }

  value = value.replace(/\D/g, '');
  value = (Number(value) / 100).toFixed(2) + '';
  value = value.replace('.', ',');
  value = value.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
  value = value.replace(/(\d)(\d{3}),/g, '$1.$2,');

  return `R$${value}`;
}

export function cpfCnpj(value: string) {
  if (!value) {
    return;
  }
  value = value.replace(/\D/g, '');

  if (value.length > 11) {
    value = value.slice(0, -1);
  }

  if (value.length > 11) {
    // value = value.replace(/(\d{2})(\d)/, '$1.$2');
    // value = value.replace(/(\d{3})(\d)/, '$1.$2');
    // value = value.replace(/(\d{3})(\d)/, '$1/$2');
    // value = value.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1-$2');
  }

  return value;
}

export function phoneBR(value: string) {
  if (!value) {
    return;
  }
  value = value.replace(/\D/g, '');

  if (value.length > 11) {
    value = value.slice(0, -1);
  }

  value = value.replace(/(\d{2})(\d)/, '($1)$2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');

  return value;
}

export function cep(value: string) {
  if (!value) {
    return;
  }

  value = value.replace(/\D/g, '');

  if (value.length > 8) {
    value = value.slice(0, -1);
  }

  value = value.replace(/(\d{5})(\d)/, '$1-$2');

  return value;
}

export function clearValue(value: string) {
  if (!value) {
    return;
  }

  return value.replace(/\D/g, '');
}

export function realToUSCash(value: string) {
  if (!value) {
    return;
  }

  return value.replace('R$', '').replace('.', '').replace(',', '.');
}
