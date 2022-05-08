import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";
import { Stack } from "./Stack.ts";

function isBalanced(text: string): boolean {
  const brackets = [["(", ")"], ["{", "}"], ["[", "]",], ["<", ">"]];
  const stack = new Stack<string>();

  for (const char of [...text]) {
    if (isOpenBracket(char)) stack.push(char);
    if (!isCloseBracket(char)) continue;
    if (stack.isEmpty()) return false;
    const openBracket = stack.pop() || "";
    if (!isMatchingBracket(openBracket, char)) return false;

  }

  return stack.isEmpty();


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


Deno.test("isBalanced", () => {
  ([
    ["(1 + 2)", true],
    ["<(1 + 2)>", true],
    ["(1 + 2", false],
    ["(1 + 2)]", false],
    [")1 + 2(", false],
    ["(1 + 2(", false]
  ] as Array<[string, boolean]>)
    .forEach(([text, expected]) => {
      assertEquals(isBalanced(text), expected);
    });
})