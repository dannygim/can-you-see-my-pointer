function dispatchContentEvent(event: CustomEvent<XContentEvent>) {
  document.querySelector(".can-you-see-my-pointer")?.dispatchEvent(event);
}

export function openColorChooser() {
  dispatchContentEvent(
    new CustomEvent<XContentEvent>(
      "x-content-event",
      { detail: { type: "open_color_chooser" } },
    ),
  );
}

export function choseColor(color: NamedColor) {
  dispatchContentEvent(
    new CustomEvent<XContentEvent>(
      "x-content-event",
      { detail: { type: "set_color", color } },
    ),
  );
}
