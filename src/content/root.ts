import styles from './styles.css?inline';
import { MyCanvas } from "./canvas";
import { Menu } from "./menu";
import { NamedColor } from './types';

export default class CanYouSeeMyPointer {
  #root?: HTMLElement;
  #myCanvas?: MyCanvas;
  #menu?: Menu;

  build() {
    this.#root = document.createElement('div');
    this.#root.className = 'can-you-see-my-pointer';

    // Create a shadow root
    const shadow = this.#root.attachShadow({ mode: 'closed' });
    console.debug('shadow', shadow);

    // custom shadow style
    const style = document.createElement('style');
    style.textContent = styles;

    // Create a canvas
    this.#myCanvas = new MyCanvas();
    const canvas = this.#myCanvas.build();

    // Create a menu
    this.#menu = new Menu();
    const menu = this.#menu.build();

    // set color
    this.#myCanvas.setColor(NamedColor.Orange);
    this.#menu.setColor(NamedColor.Orange);

    // append children
    shadow.appendChild(style);
    shadow.appendChild(canvas);
    shadow.appendChild(menu);

    // append to body
    document.body.appendChild(this.#root);
  }

  destroy() {
    this.#myCanvas?.destroy();
    this.#menu?.destroy();
    if (this.#root) {
      document.body.removeChild(this.#root);
    }

    this.#myCanvas = undefined;
    this.#menu = undefined;
    this.#root = undefined;
  }
}
