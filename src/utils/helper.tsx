import { FormEvent } from 'react';

export function simplifyRatio(width: number, height: number) {
  const gcd: any = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

export function getFormData(names: string[], e: HTMLFormElement) {
  const data = new FormData(e);
  const format: Record<string, string | undefined> = {};

  names.forEach(name => {
    const value = data.get(name);
    format[name] = value !== null ? String(value) : undefined;
  });

  return format;
}
