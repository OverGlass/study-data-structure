import { Stack } from "./Stack.ts"

function reverseString(str: string): string {
  const stack = new Stack();
  const charArr = str.split("");
  charArr.forEach(char => stack.push(char))
  return charArr.reduce(acc => acc += stack.pop(), "")
}

export { reverseString };