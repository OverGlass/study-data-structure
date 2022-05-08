export class Stack<T> {
  private data: T[] = [];
  public push(x: T) {
    this.data.push(x);
  }
  public pop(): T {
    const popped = this.data.pop();
    if (popped === undefined) {
      throw new Error("Empty stack");
    }
    return popped;
  }
  public isEmpty(): boolean {
    return this.data.length === 0;
  }
}