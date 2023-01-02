function installedEventListener(details: chrome.runtime.InstalledDetails) {
  console.debug('installed event handler called', details);
}

export function init() {
  console.debug('installed event handler loaded');

  // install or update event
  chrome.runtime.onInstalled.addListener(installedEventListener);
}
