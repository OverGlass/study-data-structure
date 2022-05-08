export class Stack<T> {
  private data: T[] = [];
  public push(x: T) {
    this.data.push(x);
  }
  public pop(): T | undefined {
    return this.data.pop();
  }
  public isEmpty(): boolean {
    return this.data.length === 0;
  }
}