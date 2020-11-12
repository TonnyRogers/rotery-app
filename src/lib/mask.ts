export function formatBRL(value: string) {
  value = value.replace(/\D/g, '');

  return (value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) / 100));
}

export function cpfCnpj(value: string) {
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
  value = value.replace(/\D/g, '');

  if (value.length > 11) {
    value = value.slice(0, -1);
  }

  value = value.replace(/(\d{2})(\d)/, '($1)$2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');

  return value;
}

export function cep(value: string) {
  value = value.replace(/\D/g, '');

  if (value.length > 8) {
    value = value.slice(0, -1);
  }

  value = value.replace(/(\d{5})(\d)/, '$1-$2');

  return value;
}

export function clearValue(value: string) {
  return value.replace(/\D/g, '');
}
