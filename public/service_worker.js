chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "getTabInfo") {
        let queryOptions = { active: true, lastFocusedWindow: true };
        chrome.tabs.query(queryOptions, ([tab]) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                sendResponse({ url: "some error has occurred" });
            }
            else {
                sendResponse({ url: tab.url });
            }
        });
        return true; // Keep the message channel open
    }
});
