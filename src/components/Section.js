export class Section {
  constructor({ renderer }, classSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  addItem(item) {
    this._renderer(item);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item, "append");
    });
  }
}
