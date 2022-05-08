class Node<A> implements Node<A> {
  value: A
  next: null | Node<A>

  constructor(value: A, next: null | Node<A>) {
    this.value = value
    this.next = next
  }
  static of<A>(value: A, next: null | Node<A>) {
    return new Node(value, next)
  }
}

export class LinkedList<A> implements LinkedList<A> {

  private first: null | Node<A>
  private last: null | Node<A>
  private size: number

  // - Constructors ----------------------------------------------------------

  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }

  static fromArray<A>(xs: Array<A>) {
    const list = new LinkedList()
    for (const x of xs) {
      list.addLast(x)
    }
    return list
  }

  static of<A>(...xs: Array<A>) {
    return this.fromArray(xs)
  }

  addFirst(value: A) {
    const node = Node.of(value, this.first)
    this.first = node
    if (this.last === null) {
      this.last = node
    }
    this.size++
    return this
  }

  addLast(value: A) {
    const node = Node.of(value, null)
    if (this.last === null) this.first = node
    else this.last.next = node
    this.last = node
    this.size++
    return this
  }

  // - Iterators --------------------------------------------------------------

  *[Symbol.iterator]() {
    let current = this.first
    while (current) {
      yield current.value
      current = current.next
    }
  }

  forEach(f: (x: A) => void) {
    for (const x of this) {
      f(x)
    }
  }

  // - Functor ----------------------------------------------------------------

  map<B>(f: (x: A) => B): LinkedList<B> {
    const list = new LinkedList<B>()
    for (const x of this) {
      list.addLast(f(x))
    }
    return list
  }

  // - Destructors ------------------------------------------------------------

  toArray() {
    return [...this]
  }

  removeFirst() {
    if (this.first === null) throw new Error("Empty list")
    if (this.first === this.last) this.first = this.last = null
    else {
      const second = this.first.next || null
      this.first.next = null
      this.first = second
    }
    this.size--
    return this
  }

  removeLast() {
    if (this.first === null) throw new Error("Empty list")
    if (this.first === this.last) this.first = this.last = null
    else {
      const previous = this.getPrevious(this.last)
      this.last = previous
    }
    this.size--
    return this
  }

  // - Utils ------------------------------------------------------------------

  isEmpty() {
    return this.first === null
  }

  private getPrevious(node: Node<A> | null) {
    let current = this.first
    while (current) {
      if (current.next === node) return current
      current = current.next
    }
    return null
  }

  indexOf(value: A) {
    let index = 0
    for (const x of this) {
      if (x === value) return index
      index++
    }
    return -1
  }

  contains(value: A) {
    return this.indexOf(value) !== -1
  }

  length() {
    return this.size
  }

  peek() {
    if (this.first === null) throw new Error("Empty list")
    return this.first.value
  }

  peekLast() {
    if (this.last === null) throw new Error("Empty list")
    return this.last.value
  }

  peekByIndex(index: number) {
    if (index < 0 || index >= this.size) throw new Error("Index out of range")
    let current = this.first
    for (let i = 0; i < index; i++) {
      current = current?.next || null
    }
    return current?.value
  }

  reverse() {
    if (this.first === null) return this
    let previous = this.first
    let current = this.first?.next || null
    while (current) {
      const next = current.next
      current.next = previous
      previous = current
      current = next
    }
    this.last = this.first
    this.last.next = null
    this.first = previous
    return this
  }

  getKthFromLast(k: number) {
    if (k < 0) throw new Error("Index out of range")
    let pointerA = this.first
    let pointerB = this.first
    for (let i = 0; i < k - 1; i++) {
      pointerB = pointerB?.next || null
      if (pointerB === null) throw new Error("Index out of range")
    }
    while (pointerB?.next) {
      pointerA = pointerA?.next || null
      pointerB = pointerB?.next || null
    }
    return pointerA?.value
  }
}

