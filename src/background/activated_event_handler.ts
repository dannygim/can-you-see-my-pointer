import { changeActiveExtension } from "./messages.ts";

async function handlerActivated(
  activeInfo: { tabId: number; windowId: number },
) {
  console.debug("activated", activeInfo);
  const result = await chrome.storage.session.get([__KEY_IS_ENABLED__]);
  const shouldEnable = result[__KEY_IS_ENABLED__] ?? false;
  await changeActiveExtension(shouldEnable);
}

export function init() {
  chrome.tabs.onActivated.addListener(handlerActivated);
}
