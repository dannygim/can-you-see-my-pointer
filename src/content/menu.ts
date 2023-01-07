import MenuColor from "./menu_color";

export class Menu {
  #menuColor?: MenuColor;

  constructor() {
  }

  build(): HTMLElement {
    // Create a menu
    const menu = document.createElement('ul');
    menu.className = 'menu';

    // Title
    menu.innerHTML = "<li><span>Menu</span></li>";

    // Create a menu item
    this.#menuColor = new MenuColor();
    const menuColor = this.#menuColor.build();


    // append children
    menu.appendChild(menuColor);

    return menu;
  }

  destroy() {
    this.#menuColor?.destroy();
    this.#menuColor = undefined;
  }

  setColor(color: NamedColor) {
    this.#menuColor?.setColor(color);
  }
}
