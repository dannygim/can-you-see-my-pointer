import MenuItemColor from "./menu_item_color";

export class Menu {
  #menuColor?: MenuItemColor;

  constructor() {
  }

  build(): HTMLElement {
    // Create a menu
    const menu = document.createElement('ul');
    menu.className = 'menu';

    // Title
    menu.innerHTML = "<li><span>Color</span></li>";

    // Create a menu item
    this.#menuColor = new MenuItemColor();
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
