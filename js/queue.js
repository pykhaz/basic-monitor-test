/**
 *       title: queue.js
 *      author: khaz
 *        desc: class Queue
 *  created on: 2026-09-04 19:25:17.205357
 */

// import { dbglog } from '#lib/softdev/debug.js';

class Queue {
  constructor() {
    this.items = [];
  }

  // Append to the end
  enqueue(element) {
    this.items.push(element);
  }

  clear() {
      this.items = [];
  }

  // Get from the beginning (returns undefined if empty)
  dequeue() {
    return this.items.shift();
  }

  // Peek at element nr index
  peek(index = 0) {
    if (index < 0) {
        index = this.items.length + index
    }
    return this.items[index];
  }

  size() {
    return this.items.length;
  }

  toString() {
    return `Queue([${this.items.join(', ')}])`;
  }
}
