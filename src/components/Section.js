export default class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  set items( newItem ){
    this._items = newItem;
  }

  set renderer( newRenderer){
    this._renderer = newRenderer;
  }

  addItem(element, addToTop) {
    if (addToTop === true){
      this._container.prepend(element)
    } else{
      this._container.append(element);
    }
  }

  renderItems(alone) {
    if (alone === true){
      this._renderer(this._items);
    } else {
      this._items.forEach(item => {
        this._renderer(item);
      });
    }
  }
}

