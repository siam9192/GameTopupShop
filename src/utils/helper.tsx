export function simplifyRatio(width: number, height: number) {
  const gcd: any = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}
