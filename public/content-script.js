
document.body.innerHTML = "";
let allowedSites;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    allowedSites = request.updatedSite;
    sendResponse({ reply: "the site has been requested to block/unblock" })
});

const ans = async () => {
    try {

        let response = await fetch(chrome.runtime.getURL("index.html"));
        let text = await response.text();
        console.log(allowedSites);
        document.body.innerHTML = `
  <iframe src="${chrome.runtime.getURL("index.html")}" style="width:100vw; height:100vh; border:none;"></iframe>
`;

    } catch (error) {
        console.log(error);
    }
}
ans();
