import { changeActiveExtension } from "./messages";

async function handlerActivated(activeInfo: chrome.tabs.TabActiveInfo) {
  console.debug('activated', activeInfo);
  const result = await chrome.storage.session.get([__KEY_IS_ENABLED__]);
  const shouldEnable = result[__KEY_IS_ENABLED__] ?? false;
  await changeActiveExtension(shouldEnable);
}

export function init() {
  chrome.tabs.onActivated.addListener(handlerActivated);
}
