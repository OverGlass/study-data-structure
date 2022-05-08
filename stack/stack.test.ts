import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";
import { isBalanced } from "./isBalanced.ts";
import { reverseString } from "./reverseString.ts";


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


Deno.test("reverseString", () => {
  [
    ["hello", "olleh"],
    ["abcd", "dcba"],
    ["", ""],
  ]
    .forEach(([text, expected]) => {
      assertEquals(reverseString(text), expected);
    });
})