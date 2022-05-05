interface Node<A> {
  value: A
  next: Node<A> | null,
}

interface LinkedList<A> {
  first: Node<A> | null
  last: Node<A> | null
  size: number
}

class Node<A> implements Node<A> {
  constructor(value: A, next: null | Node<A>) {
    this.value = value
    this.next = next
  }
  static of<A>(value: A, next: null | Node<A>) {
    return new Node(value, next)
  }
}

export const of = <A>(): LinkedList<A> => ({
  first: null,
  last: null,
  size: 0
})

export const addFirst: <A>(x: A) => (xs: LinkedList<A>) => LinkedList<A>
  = x => xs => {
    const node = Node.of(x, xs.first);
    xs.first = node
    xs.last = xs.last || node
    xs.size += 1
    return xs
  }


export const addLast: <A>(x: A) => (xs: LinkedList<A>) => LinkedList<A>
  = x => xs => {
    const node = Node.of(x, null)
    if (xs.last) xs.last.next = node
    xs.first = xs.first || node
    xs.last = node
    xs.size += 1
    return xs
  }

export const deleteFirst: <A>(xs: LinkedList<A>) => LinkedList<A>
  = xs => {
    if (isEmpty(xs)) return xs
    if (xs.first === xs.last) {
      xs.first = xs.last = null
    } else {
      const second = xs.first?.next || null
      if (xs.first) xs.first.next = null // clear memory
      xs.first = second
    }
    xs.size -= 1
    return xs
  }

export const deleteLast: <A>(xs: LinkedList<A>) => LinkedList<A>
  = xs => {
    if (isEmpty(xs)) return xs
    if (xs.first === xs.last) {
      xs.first = xs.last = null
    } else {
      const previous = xs.last ? getPrevious(xs.last)(xs) : null
      if (xs.last) xs.last.next = null // clear memory 
      xs.last = previous
    }
    xs.size -= 1

    return xs
  }

export const toArray: <A>(xs: LinkedList<A>) => A[]
  = ({ first }) => {
    let current = first;
    const array = []
    while (current) {
      array.push(current.value)
      current = current.next
    }
    return array
  }

export const fromArray: <A>(xs: Array<A>) => LinkedList<A>
  = <A>(xs: A[]) => {
    const LL = of<A>()
    xs.forEach((x) => addLast(x)(LL))
    return LL
  }

export const map: <A>(fn: (x: A) => A) => (xs: LinkedList<A>) => LinkedList<A>
  = fn => xs => {
    let current = xs.first;
    while (current) {
      current.value = fn(current.value)
      current = current.next
    }
    return xs
  }

export const forEach: <A>(fn: (x: A) => unknown) => (xs: LinkedList<A>) => LinkedList<A>
  = fn => xs => {
    let current = xs.first;
    while (current) {
      fn(current.value)
      current = current.next
    }
    return xs
  }

export const elemIndex: <A>(x: A) => (xs: LinkedList<A>) => number
  = x => xs => {
    let current = xs.first;
    let indexCount = 0
    while (current) {
      if (x === current.value)
        return indexCount
      indexCount++
      current = current.next
    }
    return -1
  }

export const getByIndex: <A>(x: number) => (xs: LinkedList<A>) => A | undefined
  = x => xs => {
    let index = 0;
    let current = xs.first
    while (index <= x) {
      current = current?.next || null
    }
    return current?.value
  }

export const contain: <A>(x: A) => (xs: LinkedList<A>) => boolean
  = x => xs => elemIndex(x)(xs) !== -1

export const isEmpty: <A>(xs: LinkedList<A>) => boolean
  = xs => xs.first === null && xs.last === null

export const reverse: <A>(xs: LinkedList<A>) => LinkedList<A>
  = <A>(xs: LinkedList<A>) => {
    if (isEmpty(xs)) return xs
    let previous = xs.first
    let current = xs.first?.next
    while (current) {
      const next = current.next
      current.next = previous
      previous = current
      current = next
    }

    xs.last = xs.first
    if (xs.last) xs.last.next = null
    xs.first = previous

    return xs


  }
/**
 * [1, 2, 3, 4]
 *  *     *  
 * 
 */
export const getKthFromEnd: <A>(n: number) => (xs: LinkedList<A>) => A | undefined
  = n => xs => {
    if (n <= 0) return xs.last?.value
    let first = xs.first
    let second = xs.first
    for (let i = 0; i < n - 1; i++) {
      second = second?.next || null
      if (second === null)
        throw new Error("nKth too large")
    }
    while (second !== xs.last) {
      first = first?.next || null
      second = second?.next || null
    }
    return first?.value
  }

const getPrevious: <A> (x: Node<A>) => (xs: LinkedList<A>) => Node<A> | null
  = x => xs => {
    let current = xs.first;
    while (current) {
      if (current.next === x) return current
      current = current.next
    }
    return null
  }
