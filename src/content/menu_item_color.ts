import { openColorChooser } from "./messages";

export default class MenuItemColor {
  #selectedColor: NamedColor = { name: 'pink', r: 255, g: 47, b: 108 };
  #menuItem?: HTMLLIElement;
  #image?: HTMLImageElement;

  build(): HTMLLIElement {
    this.#menuItem = document.createElement('li');

    // event listener
    this.#menuItem.addEventListener('click', this.#handleClick);

    // Create an image
    this.#image = document.createElement('img');
    this.#image.src = chrome.runtime.getURL(`./assets/icon_${this.#selectedColor.name}_32.png`);
    this.#menuItem.appendChild(this.#image);

    return this.#menuItem;
  }

  destroy() {
    // remove event listener
    this.#menuItem?.removeEventListener('click', this.#handleClick);

    this.#image = undefined;
    this.#menuItem = undefined;
  }

  setColor(color: NamedColor) {
    this.#selectedColor = color;
    if (this.#image) {
      this.#image.src = chrome.runtime.getURL(`./assets/icon_${this.#selectedColor.name}_32.png`);
    }
  }

  #handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    openColorChooser();
  }
}
