import * as LL from "./LinkedList.ts";
import { assertEquals } from "https://deno.land/std@0.137.0/testing/asserts.ts";
import { pipe } from "https://deno.land/x/fun/fns.ts";

const log = <A>(x: A) => {
  console.log(x);
  return x;
};

const retrn = <A>(fn: (arg: A) => void) =>
  (arg: A) => {
    fn(arg);
    return arg;
  };


Deno.test("addFirst", () => {
  pipe(
    LL.of<number>(),
    LL.addFirst(1),
    retrn((xs) => assertEquals(xs.first?.value, 1)),
    LL.addFirst(2),
    LL.addFirst(3),
    retrn((xs) => assertEquals(xs.size, 3)),
    LL.addFirst(4),
    retrn((xs) => assertEquals(pipe(xs, LL.toArray)[3], 1)),
  );
});

Deno.test("deleteFirst", () => {
  pipe(
    LL.of<number>(),
    LL.addLast(1),
    LL.addLast(2),
    LL.deleteFirst,
    retrn((xs) => assertEquals(xs.first?.value, 2)),
    LL.deleteFirst,
    retrn((xs) => assertEquals(LL.isEmpty(xs), true)),
    retrn((xs) => assertEquals(xs.size, 0)),
  );
});

Deno.test("deleteLast", () => {
  pipe(
    LL.of<number>(),
    LL.addLast(1),
    LL.addLast(2),
    LL.deleteLast,
    retrn((xs) => assertEquals(xs.first?.value, 1)),
    LL.deleteLast,
    retrn((xs) => assertEquals(LL.isEmpty(xs), true)),
    retrn((xs) => assertEquals(xs.size, 0)),
  );
});


Deno.test("elemIndex", () => {
  pipe(
    LL.fromArray([2, 3, 6, 9]),
    LL.elemIndex(6),
    retrn(i => assertEquals(i, 2)),
  );
});


Deno.test("reverse", () => {
  const data = [1, 2, 3, 4]
  pipe(
    LL.fromArray(data),
    LL.reverse,
    LL.toArray,
    retrn(xs => assertEquals(xs, data.reverse())),
  );
});


Deno.test("map", () => {
  const data = [2, 3, 6, 9]
  pipe(
    LL.fromArray(data),
    LL.map(_ => 1),
    LL.toArray,
    retrn(xs => assertEquals(xs, [1, 1, 1, 1])),
  );
});

Deno.test("getkth", () => {
  const data = [2, 3, 6, 9]
  pipe(
    LL.fromArray(data),
    LL.getKthFromEnd(1),
    retrn(x => assertEquals(x, 9))
  );
});

