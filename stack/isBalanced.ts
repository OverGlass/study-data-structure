import { Stack } from "./Stack.ts";

function isBalanced(text: string): boolean {
  const brackets = [["(", ")"], ["{", "}"], ["[", "]",], ["<", ">"]];
  const stack = new Stack<string>();

  for (const char of [...text]) {
    if (isOpenBracket(char)) stack.push(char);
    if (!isCloseBracket(char)) continue;
    if (stack.isEmpty()) return false;
    if (!isMatchingBracket(stack.pop(), char)) return false;
  }

  return stack.isEmpty();

  // - Helper functions -------------------------------------------------------

  function isOpenBracket(char: string): boolean {
    return brackets.some(([open]) => char === open);
  }

  function isCloseBracket(char: string): boolean {
    return brackets.some(([, close]) => char === close);
  }

  function isMatchingBracket(open: string, close: string): boolean {
    return brackets.some(([openBracket, closeBracket]) =>
      open === openBracket && close === closeBracket);
  }
}

export { isBalanced };


