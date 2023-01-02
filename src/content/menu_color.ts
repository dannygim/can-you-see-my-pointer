import { NamedColor } from "./types";

export default class MenuColor {
  #selectedColor: NamedColor = NamedColor.Pink;
  #image?: HTMLImageElement;

  build(): HTMLLIElement {
    const menuItem = document.createElement('li');

    // Create an anchor
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.addEventListener('click', this.#handleClick);
    menuItem.appendChild(anchor);

    // Create an image
    this.#image = document.createElement('img');
    this.#image.src = `/assets/icon_${this.#selectedColor}_32.png`;
    anchor.appendChild(this.#image);

    return menuItem;
  }

  destroy() {
    this.#image = undefined;
  }

  setColor(color: NamedColor) {
    this.#selectedColor = color;
    if (this.#image) {
      this.#image.src = `/assets/icon_${this.#selectedColor}_32.png`;
    }
  }

  #handleClick = (e: MouseEvent) => {
    e.preventDefault();
    console.debug('MenuColor handleClick called', event);
  }
}
