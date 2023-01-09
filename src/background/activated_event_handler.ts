import { changeActiveExtension } from "./messages.ts";
import { isExtensionEnabled } from "./utils.ts";

async function handlerActivated(
  activeInfo: { tabId: number; windowId: number },
) {
  console.debug("activated", activeInfo);
  const shouldEnable = await isExtensionEnabled();
  await changeActiveExtension(shouldEnable);
}

export function init() {
  chrome.tabs.onActivated.addListener(handlerActivated);
}
