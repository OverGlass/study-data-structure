import { LinkedList } from "./LinkedList.ts";
import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";

Deno.test("addFirst", () => {
  const list = new LinkedList();
  list.addFirst(1);
  assertEquals(list.peek(), 1);
  assertEquals(list.length(), 1);
  assertEquals(list.isEmpty(), false);
  assertEquals(list.contains(1), true);
  assertEquals(list.indexOf(1), 0);
  list.addFirst(2);
  assertEquals(list.peek(), 2);
});

Deno.test("removeFirst", () => {
  const list = LinkedList.of(1, 2, 3);
  list.removeFirst();
  assertEquals(list.peek(), 2);
});

Deno.test("removeLast", () => {
  const list = LinkedList.of(4, 5, 5);
  list.removeLast();
  assertEquals(list.peekLast(), 5);
});


Deno.test("indexOf", () => {
  const list = LinkedList.of(1, 2, 3);
  assertEquals(list.indexOf(2), 1);
});


Deno.test("reverse", () => {
  const data = [1, 2, 3, 4]
  const list = LinkedList
    .fromArray(data)
    .reverse();
  assertEquals(list.toArray(), data.reverse());
});


Deno.test("getkth", () => {
  const data = [2, 3, 6, 9]
  const list = LinkedList.fromArray(data);
  assertEquals(list.getKthFromLast(1), 9);
});


