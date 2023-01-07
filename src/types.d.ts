type Point = { x: number; y: number; };
type ClickPoint = Point & { life: number; };

type NamedColorRed = { name: 'red'; r: 255; g: 38; b: 0; };
type NamedColorGreen = { name: 'green'; r: 0; g: 231; b: 0; };
type NamedColorBlue = { name: 'blue'; r: 25; g: 143; b: 255; };
type NamedColorOrange = { name: 'orange'; r: 255; g: 148; b: 28; };
type NamedColorPink = { name: 'pink'; r: 255; g: 47; b: 108; };
type NamedColorYellow = { name: 'yellow'; r: 255; g: 245; b: 0; };
type NamedColorWhite = { name: 'white'; r: 255; g: 255; b: 255; };
type NamedColorBlack = { name: 'black'; r: 0; g: 0; b: 0; };
type NamedColor =
  | NamedColorRed
  | NamedColorGreen
  | NamedColorBlue
  | NamedColorOrange
  | NamedColorPink
  | NamedColorYellow
  | NamedColorWhite
  | NamedColorBlack
  ;

type XTabEvent =
  | { type: 'turn_on'; }
  | { type: 'turn_off'; }
  ;

type XContentEvent =
  | { type: 'open_color_chooser'; }
  | { type: 'set_color'; color: NamedColor; }
  ;
