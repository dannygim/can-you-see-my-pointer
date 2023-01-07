const HISTORY_LENGTH = 5;
const CLICK_POINT_LIFE = 3;

export class MyCanvas {
  #canvas?: HTMLCanvasElement;
  #ctx?: CanvasRenderingContext2D;
  #color: NamedColor;
  #currentPoint: Point = { x: -1, y: -1 };
  #clickedPoint: ClickPoint = { x: -1, y: -1, life: 0 };
  #pointerHistory: Point[];

  constructor() {
    this.#color = { name: "red", r: 255, g: 38, b: 0 };

    this.#pointerHistory = Array(HISTORY_LENGTH).fill({ x: -1, y: -1 });
  }

  build(): HTMLElement {
    // Create a canvas
    this.#canvas = document.createElement("canvas");
    this.#ctx = this.#canvas.getContext("2d")!;
    this.#resizeIfNeeded(this.#canvas);

    // Setup mouse event
    document.addEventListener("mousemove", this.#handleMouseMove, {
      capture: true,
    });
    document.addEventListener("mousedown", this.#handleMouseDown, {
      capture: true,
    });

    // start to render
    this.#render();

    return this.#canvas;
  }

  destroy() {
    // Remove mouse event
    document.removeEventListener("mousedown", this.#handleMouseMove, {
      capture: true,
    });
    document.removeEventListener("mousemove", this.#handleMouseMove, {
      capture: true,
    });

    this.#ctx = undefined;
    this.#canvas = undefined;
  }

  setColor(color: NamedColor) {
    this.#color = color;
  }

  #handleMouseMove = (e: MouseEvent) => {
    this.#currentPoint = { x: e.clientX, y: e.clientY };
  };

  #handleMouseDown = (e: MouseEvent) => {
    this.#clickedPoint = { x: e.clientX, y: e.clientY, life: CLICK_POINT_LIFE };
  };

  #resizeIfNeeded(canvas: HTMLCanvasElement) {
    if (
      canvas.width !== window.innerWidth || canvas.height !== window.innerHeight
    ) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.debug("canvas resized", canvas.width, canvas.height);
    }
  }

  #render = () => {
    if (!(this.#canvas && this.#ctx)) {
      return;
    }

    this.#resizeIfNeeded(this.#canvas);

    // Update pointer history
    this.#pointerHistory = [
      this.#currentPoint,
      ...this.#pointerHistory.slice(0, HISTORY_LENGTH - 1),
    ];

    // clear canvas
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    // draw pointer
    this.#pointerHistory.forEach((p, index) =>
      this.#renderPointer(this.#ctx!, { color: this.#color, p, index })
    );

    // draw clicked point
    this.#renderClickedPoint(this.#ctx);

    requestAnimationFrame(this.#render);
  };

  #renderPointer = (ctx: CanvasRenderingContext2D, { color, p, index }: {
    color: NamedColor;
    p: Point;
    index: number;
  }) => {
    if (!(p.x >= 0 && p.y >= 0)) return;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI * 2, true);
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.${7 - index})`;
    ctx.fill();
  };

  #renderClickedPoint = (ctx: CanvasRenderingContext2D) => {
    if (this.#clickedPoint.life <= 0) return;

    ctx.beginPath();
    ctx.arc(
      this.#clickedPoint.x,
      this.#clickedPoint.y,
      16,
      0,
      2 * Math.PI * 2,
      true,
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle =
      `rgba(${this.#color.r}, ${this.#color.g}, ${this.#color.b}, 0.${
        3 + this.#clickedPoint.life
      })`;
    ctx.stroke();

    this.#clickedPoint.life -= 1;
  };
}
