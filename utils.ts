export const lastIndex: <A>(arr: Array<A>) => number = (xs) => xs.length - 1;

export const div: (n: number, n2: number) => number = (n, n2) =>
  Math.trunc(n / n2);

export const retrn = <A>(fn: (arg: A) => void) =>
  (arg: A) => {
    fn(arg);
    return arg;
  };

export const log = <A>(x: A) => {
  console.log(x);
  return x;
};
