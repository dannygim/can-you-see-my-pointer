import { allColors } from "./common.ts";
import { choseColor } from "./messages.ts";

export default class ColorChooser {
  #chooser?: HTMLUListElement;

  build(): HTMLUListElement {
    if (this.#chooser) return this.#chooser;

    this.#chooser = document.createElement("ul");
    this.#chooser.className = "color-chooser";

    allColors().forEach((color) => {
      const li = document.createElement("li");
      li.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
      li.addEventListener("click", () => choseColor(color));
      this.#chooser?.appendChild(li);
    });

    return this.#chooser;
  }

  destroy() {
    if (!this.#chooser) return;

    this.#chooser.remove();
    this.#chooser = undefined;
  }
}
