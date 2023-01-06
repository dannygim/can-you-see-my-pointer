function handlerActivated(activeInfo: chrome.tabs.TabActiveInfo) {
  console.debug('activated', activeInfo);
  chrome.tabs.sendMessage(activeInfo.tabId, { ...activeInfo, type: 'activated' });
}

export function init() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.debug('tabs.query', tabs);
  });

  chrome.tabs.onActivated.addListener(handlerActivated);
}
