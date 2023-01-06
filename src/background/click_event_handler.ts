async function handleActionClick(tab: chrome.tabs.Tab) {
  console.debug('action clicked', tab);
  const result = await chrome.storage.session.get([__KEY_IS_ENABLED__]);
  const isEnabled = result[__KEY_IS_ENABLED__] ?? false;

  const iconPrefix = isEnabled ? 'icon_off' : 'icon';
  chrome.action.setIcon({
    path: {
      16: `assets/${iconPrefix}_16.png`,
      32: `assets/${iconPrefix}_32.png`,
      48: `assets/${iconPrefix}_48.png`,
      128: `assets/${iconPrefix}_128.png`,
    }
  });
  await chrome.storage.session.set({ [__KEY_IS_ENABLED__]: !isEnabled });

  // send on/off message to all tabs in current window
  (await chrome.tabs.query({
    currentWindow: true,
    windowType: 'normal',
  })).forEach((tab, i) => {
    console.debug('[%d] tab: %o', i, tab);
    const message: XEvent = (tab.active && tab.highlighted && !isEnabled)
      ? { type: 'turn_on' }
      : { type: 'turn_off' };
    chrome.tabs.sendMessage<XEvent, void>(tab.id!, message);
  });
}

export function init() {
  // action click event
  chrome.action.onClicked.addListener(handleActionClick);
}
