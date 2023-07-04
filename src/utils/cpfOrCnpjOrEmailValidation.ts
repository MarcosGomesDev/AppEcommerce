export function isValidCPF(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  value = value.replace(/[^\d]+/g, '');
  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
    return false;
  }
  const values = value.split('').map(el => +el);
  const rest = (count: number) =>
    ((values
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;
  return rest(10) === values[9] && rest(11) === values[10];
}

export function isValidCnpj(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '') {
    return false;
  }

  if (cnpj.length !== 14) {
    return false;
  }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false;
  }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado.toString() !== digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado.toString() !== digitos.charAt(1)) {
    return false;
  }

  return true;
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isCpfOrCnpjValid(cpfCnpj: string): boolean {
  if (isValidCPF(cpfCnpj)) {
    return true;
  } else if (isValidCnpj(cpfCnpj)) {
    return true;
  }

  return false;
}

export function isCpfOrCnpjOrEmailValid(cpfCnpjEmail: string) {
  if (isValidCPF(cpfCnpjEmail)) {
    return true;
  } else if (isValidCnpj(cpfCnpjEmail)) {
    return true;
  } else if (isValidEmail(cpfCnpjEmail)) {
    return true;
  }

  return false;
}
