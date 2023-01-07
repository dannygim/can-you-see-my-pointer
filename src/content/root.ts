import styles from './styles.css?inline';
import { MyCanvas } from "./canvas";
import { Menu } from "./menu";
import ColorChooser from './color_chooser';

export default class CanYouSeeMyPointer {
  #root?: HTMLElement;
  #myCanvas?: MyCanvas;
  #menu?: Menu;
  #colorChooser?: ColorChooser;

  build() {
    this.#root = document.createElement('div');
    this.#root.className = 'can-you-see-my-pointer';
    this.#root.addEventListener('x-content-event', this.#handleContentEvent);

    // Create a shadow root
    const shadow = this.#root.attachShadow({ mode: 'open' });
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
    const orange: NamedColor = { name: 'orange', r: 255, g: 148, b: 28 };
    this.#setColor(orange);

    // append children
    shadow.appendChild(style);
    shadow.appendChild(canvas);
    shadow.appendChild(menu);

    // append to body
    document.body.appendChild(this.#root);
  }

  destroy() {
    this.#colorChooser?.destroy();
    this.#myCanvas?.destroy();
    this.#menu?.destroy();
    if (this.#root) {
      this.#root.removeEventListener('x-content-event', this.#handleContentEvent);
      document.body.removeChild(this.#root);
    }

    this.#colorChooser = undefined;
    this.#myCanvas = undefined;
    this.#menu = undefined;
    this.#root = undefined;
  }

  // x-content-event handler
  #handleContentEvent = ((e: CustomEvent<XContentEvent>) => {
    console.debug('handleContentEvent', e);
    switch (e.detail.type) {
      case 'open_color_chooser':
        this.#showColorChooser();
        break;

      case 'set_color':
        this.#setColor(e.detail.color);
        break;

      default:
        break;
    }
  }) as EventListenerOrEventListenerObject;

  #showColorChooser() {
    if (!this.#colorChooser) {
      this.#colorChooser = new ColorChooser();
    }

    this.#root?.shadowRoot?.appendChild(this.#colorChooser.build());
  }

  #setColor(color: NamedColor) {
    this.#myCanvas?.setColor(color);
    this.#menu?.setColor(color);
    this.#colorChooser?.destroy();
    this.#colorChooser = undefined;
  }
}
