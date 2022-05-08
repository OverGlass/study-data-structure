#include <iostream>
using namespace std;

template <typename T>
class LinkedList
{
  class Node
  {
  public:
    T data;
    Node *next;
    Node(T value)
    {
      data = value;
      next = nullptr;
    };
  };

private:
  Node *head;
  Node *tail;

  Node *getPrevious(Node *n)
  {
    Node *current = head;
    while (current != nullptr)
    {
      if (n == current->next)
        return current;
      current = current->next;
    }
    return nullptr;
  };

public:
  int size;
  LinkedList()
  {
    head = nullptr;
    tail = nullptr;
    size = 0;
  };

  LinkedList &addFirst(T value)
  {
    Node *node = new Node(value);
    if (head == nullptr)
    {
      head = node;
      tail = node;
    }
    else
    {
      node->next = head;
      head = node;
    }
    size++;
    return *this;
  };

  LinkedList &removeFirst()
  {
    if (isEmpty())
      return *this;
    if (head == tail)
      head = tail = nullptr;
    else
    {
      Node *second = head->next;
      head->next = nullptr; // clear ref
      head = second;
    }
    size--;
    return *this;
  }

  LinkedList &addLast(T val)
  {
    Node *node = new Node(val);
    if (isEmpty())
      head = tail = node;
    else
    {
      tail->next = node;
      tail = node;
    }
    size++;
    return *this;
  }

  LinkedList &removeLast()
  {
    if (isEmpty())
      return *this;
    Node *previous = getPrevious(tail);
    previous->next = nullptr;
    tail = previous;
    return *this;
  }

  LinkedList &reverse()
  {
    Node *previous = head;
    Node *current = head->next;
    while (current != nullptr)
    {
      Node *next = current->next;
      current->next = previous;
      previous = current;
      current = next;
    }
    tail = head;
    tail->next = nullptr;
    head = previous;
    return *this;
  }

  bool isEmpty()
  {
    return head == nullptr;
  }

  void print()
  {
    Node *current = head;
    cout << "(" << size << ")[";
    while (current != nullptr)
    {
      Node *next = current->next;
      cout << current->data << (next == nullptr ? "" : ", ");
      current = next;
    };
    cout << "] h:" << head->data << " t:" << tail->data << endl;
  };
};

int main()
{

  // LinkedList<int>()
  //     .addFirst(1)
  //     .addFirst(4)
  //     .addFirst(3)
  //     .print();

  // LinkedList<int>()
  //     .addFirst(1)
  //     .addFirst(4)
  //     .addFirst(5)
  //     .removeFirst()
  //     .print();

  // LinkedList<int>()
  //     .addLast(1)
  //     .addLast(4)
  //     .addLast(5)
  //     .print();

  // LinkedList<int>()
  //     .addLast(1)
  //     .addLast(4)
  //     .removeLast()
  //     .print();

  LinkedList<int>()
      .addLast(1)
      .addLast(4)
      .addLast(5)
      .reverse()
      .print();
  // print the size of the list
  // cout << "Size: " << list.size << endl;
  return 0;
};