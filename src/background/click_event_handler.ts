import { changeActiveExtension } from "./messages.ts";
import { isExtensionEnabled, setExtensionEnabled } from "./utils.ts";

async function handleActionClick(tab: chrome.tabs.Tab) {
  console.debug("action clicked", tab);
  const isEnabled = await isExtensionEnabled();
  const shouldEnable = !isEnabled;

  const iconPrefix = shouldEnable ? "icon" : "icon_off";
  chrome.action.setIcon({
    path: {
      16: `assets/${iconPrefix}_16.png`,
      32: `assets/${iconPrefix}_32.png`,
      48: `assets/${iconPrefix}_48.png`,
      128: `assets/${iconPrefix}_128.png`,
    },
  });

  await setExtensionEnabled(shouldEnable);

  // send on/off message to all tabs in current window
  await changeActiveExtension(shouldEnable);
}

export function init() {
  // action click event
  chrome.action.onClicked.addListener(handleActionClick);
}
