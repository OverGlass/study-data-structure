export class Queue<T> {
  private data: Array<T> = [];
  add(x: T) {
    this.data.push(x);
  }
  remove(): T {
    const head = this.data.shift();
    if (head === undefined) {
      throw new Error('Queue is empty');
    }
    return head;
  }
  isEmpty(): boolean {
    return this.data.length === 0;
  }

}