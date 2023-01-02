import styles from './styles.css?inline';
import { MyCanvas } from './canvas';
import { Menu } from './menu';
import { NamedColor } from './types';

// Define the <can-you-see-my-pointer> element
customElements.define('can-you-see-my-pointer', class extends HTMLElement {
  #myCanvas: MyCanvas;
  #menu: Menu;

  constructor() {
    super();
    console.debug('CanYouSeeMyPointer constructor called');

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'closed' });
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
  }

  disconnectedCallback() {
    console.debug('CanYouSeeMyPointer disconnectedCallback called');
    this.#myCanvas.destroy();
  }
});

export function turnOn() {
  const myExtension = document.createElement('can-you-see-my-pointer');
  document.body.appendChild(myExtension);
}
