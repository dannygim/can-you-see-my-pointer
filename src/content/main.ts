import CanYouSeeMyPointer from './root';

let myExtension: CanYouSeeMyPointer | null = null;

function turnOn() {
  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.classList.add('prevent-pointer-events');
  });

  myExtension = new CanYouSeeMyPointer();
  myExtension.build();
}

function turnOff() {
  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.classList.remove('prevent-pointer-events');
  });

  myExtension?.destroy();
  myExtension = null;
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function handleMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
  console.debug('content script received message', message, sender);
  switch (message.type) {
    case 'turn_on':
      turnOn();
      break;

    case 'turn_off':
      turnOff();
      break;

    default:
      console.debug('unknown message type', message);
      break;
  }
  sendResponse('hello from content script');
  return true;
}

(() => {
  chrome.runtime.onMessage.addListener(handleMessage);
})();
