import { onMessage, sendMessage } from "webext-bridge";
import { Tabs } from "webextension-polyfill";
import browser from "webextension-polyfill";

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log("Extension installed");
});

let previousTabId = 0;

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId;
    return;
  }

  let tab: Tabs.Tab;

  try {
    tab = await browser.tabs.get(previousTabId);
    previousTabId = tabId;
  } catch {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("previous tab", tab);
  sendMessage(
    "tab-prev",
    { title: tab.title },
    { context: "content-script", tabId }
  );
});

onMessage('connect-wallet', async () => {
    // TODO: can do a browser.storage.local check here for connected wallets
		// TODO: close extension here

  browser.windows.create({
    // TODO: change this url
    url: '/dist/options/index.html?popup=true',
    width: 375,
    height: 600,
    type: 'popup',
    focused: true,
  });
})

onMessage('wallet-connected', async () => {
  // Close popup
  browser.tabs.query({ active: true, windowType: 'popup' }).then(response => {
    if (response.length && response[0].id) {
      browser.tabs.remove(response[0].id)
    }
  })

  // TODO: open extension here
})

// onMessage("get-current-tab", async () => {
//   try {
//     const tab = await browser.tabs.get(previousTabId);
//     return {
//       title: tab?.id,
//     };
//   } catch {
//     return {
//       title: undefined,
//     };
//   }
// });
