import { LinkedList } from '../linked-list/LinkedList.ts';
export class Stack<T> {
  private data = new LinkedList<T>();
  public push(x: T) {
    this.data.addFirst(x);
  }
  public pop(): T {
    if (this.data.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.data.pop();
  }
  public isEmpty(): boolean {
    return this.data.isEmpty();
  }
}