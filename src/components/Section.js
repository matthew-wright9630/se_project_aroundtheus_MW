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
    this._items.forEach((item) => {
      this._renderer(item, "append");
    });
  }
}
