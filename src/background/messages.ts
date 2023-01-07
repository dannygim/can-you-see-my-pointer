export async function changeActiveExtension(shouldEnable: boolean) {
  // send on/off message to all tabs in current window
  (await chrome.tabs.query({
    // currentWindow: shouldEnable ? true : undefined,
    windowType: 'normal',
  })).forEach((tab, i) => {
    console.debug('[%d] tab: %o', i, tab);
    const message: XTabEvent = (shouldEnable && tab.active && tab.highlighted)
      ? { type: 'turn_on' }
      : { type: 'turn_off' };
    chrome.tabs.sendMessage<XTabEvent, void>(tab.id!, message);
  });
}
