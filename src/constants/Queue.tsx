import Storage from "./Storage";

class Queue {
  storage: any;
  constructor() {
    this.storage = [];
  };
  addElement(element: any) {
    Storage.getItem('respuestas')
      .then(result => {
        if (result) {
          this.storage = result;
          console.log('para storage', element);
          this.storage.push(element);
          console.log('storage', this.storage)
          Storage.setItem('respuestas', this.storage)
        } else {
          this.storage.push(element);
          console.log('storage', this.storage)
          Storage.setItem('respuestas', this.storage)
        }
      })
  };
  removeElement() {
    if (!this.isEmpty()) {
      this.storage.shift();
      // Storage.setItem('respuestas',this.storage)
    }
    else {
      console.log('Queue is empty');
    }
  };
  viewFirstElement() {
    if (!this.isEmpty()) {
      return this.storage[0];
    }
    else {
      console.log('Queue is empty');
    }
  };
  isEmpty() {
    if (this.storage == null) {
      return true;
    }
    if (this.storage.length === 0) {
      return true;
    }
    else {
      return false;
    }
  };
  viewQueue() {
    return this.storage;
  };
};

export default Queue;