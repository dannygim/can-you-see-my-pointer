export type Point = { x: number; y: number; };
export type ClickPoint = Point & { life: number; };
export type RGBColor = { r: number; g: number; b: number }
export enum NamedColor {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Orange = 'orange',
  Pink = 'pink',
  Yellow = 'yellow',
  White = 'white',
  Black = 'black',
}

export namespace NamedColor {
  export function toRGB(color: NamedColor): RGBColor {
    switch (color) {
      case NamedColor.Red:
        return { r: 255, g: 38, b: 0 };
      case NamedColor.Green:
        return { r: 0, g: 231, b: 0 };
      case NamedColor.Blue:
        return { r: 25, g: 143, b: 255 };
      case NamedColor.Orange:
        return { r: 255, g: 148, b: 28 };
      case NamedColor.Pink:
        return { r: 255, g: 47, b: 108 };
      case NamedColor.Yellow:
        return { r: 255, g: 245, b: 0 };
      case NamedColor.White:
        return { r: 255, g: 255, b: 255 };
      case NamedColor.Black:
        return { r: 0, g: 0, b: 0 };
    }
  }

  export function allColors(): NamedColor[] {
    return [
      NamedColor.Red,
      NamedColor.Green,
      NamedColor.Blue,
      NamedColor.Orange,
      NamedColor.Pink,
      NamedColor.Yellow,
      NamedColor.White,
      NamedColor.Black,
    ];
  }
}
