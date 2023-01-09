import * as ActivatedEventHandler from "./activated_event_handler.ts";
import * as ClickEventHandler from "./click_event_handler.ts";
import * as InstalledEventHandler from "./installed_event_handler.ts";

console.debug("background script loaded");
InstalledEventHandler.init();
ClickEventHandler.init();
ActivatedEventHandler.init();
