const gcd = (a, b) => {
  if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

  return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
};

export default (decimal) => {
  const len = decimal.toString().length - 2;

  let d = 10 ** len;
  let n = Number(decimal * d).toFixed(2);

  const divisor = gcd(n, d);

  n /= divisor;
  d /= divisor;

  return {
    numerator: n,
    denominator: d,
  };
};
