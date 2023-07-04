export function maskCEP(value: any) {
  if (!value) return;
  return value.replace(/\D/g, '').replace(/(\d{5})(\d{2})/, '$1-$2');
}
