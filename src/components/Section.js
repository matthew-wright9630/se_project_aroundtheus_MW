export class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  addItem(item) {
    this._renderer(item);
  }

  renderItems() {
    console.log(this._items, "items");
    this._items.forEach((item) => {
      this._renderer(item, "append");
    });
  }
}
