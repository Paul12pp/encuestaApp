import Storage from "./Storage";

class Queue {
  storage: any;
  constructor() {
    this.storage = {visita:[],solovisita:[]};
  };
  addElement(element: any) {
    Storage.getItem('all')
      .then(result => {
        if (result) {
          this.storage.visita = result.visita;
          this.storage.solovisita = result.solovisita;
          this.storage.visita.push(element);
          Storage.setItem('all', this.storage)
        } else {
          this.storage.visita.push(element);
          // this.storage.solovisita = result.solovisita;
          Storage.setItem('all', this.storage)
        }
      })
  };
  addVisita(element: any) {
    Storage.getItem('all')
      .then(result => {
        if (result) {
          this.storage.solovisita = result.solovisita;
          this.storage.visita = result.visita ? result.visita:this.storage.visita;
          this.storage.solovisita.push(element);
          Storage.setItem('all', this.storage)
        } else {
          this.storage.solovisita.push(element);
          // this.storage.visita = result.visita ? result.visita:this.storage.visita;
          Storage.setItem('all', this.storage)
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