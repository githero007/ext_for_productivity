
document.body.innerHTML = "";
let allowedSites = {
    "Social Media": false,
    "Youtube": true,
    "BrainRot": true
};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    allowedSites = request.updatedSite;
    sendResponse({ reply: "the site has been requested to block/unblock" })
});
let currentTab = '';
const socialMedia = [
    "facebook.com",
    "tiktok.com",
    "instagram.com",
    "twitter.com",
    "x.com",
    "discord.com",
    "discordapp.com",
    "skype.com",
    "snapchat.com",
    "reddit.com",
    "linkedin.com",
    "pinterest.com"
];
const youTube = [
    "youtube.com"
]
const brainRot = [
    "youtube.com/shorts",
    "instagram.com/reels"

]
let currentURL = "";
chrome.runtime.sendMessage({ type: "getTabInfo" }, (response) => {
    if (response?.error) {
        console.error("Error getting tab info:", response.error);
    }
    else {
        console.log("Active tab URL:", response?.url);
        currentURL = response.url;
    }
});

const ans = async () => {
    try {

        let response = await fetch(chrome.runtime.getURL("index.html"));
        let text = await response.text();
        console.log('allowed sites', allowedSites);
        if (allowedSites["Social Media"] == false && socialMedia.includes(currentURL)) {
            document.body.innerHTML = `
  <iframe src="${chrome.runtime.getURL("index.html")}" style="width:100vw; height:100vh; border:none;"></iframe>
`;
        }
        if (allowedSites["Youtube"] == false && youTube.includes(currentURL)) {
            document.body.innerHTML = `
  <iframe src="${chrome.runtime.getURL("index.html")}" style="width:100vw; height:100vh; border:none;"></iframe>
`;
        }
        if (allowedSites["BrainRot"] == false && brainRot.includes(currentURL)) {
            document.body.innerHTML = `
  <iframe src="${chrome.runtime.getURL("index.html")}" style="width:100vw; height:100vh; border:none;"></iframe>`;

        }


    } catch (error) {
        console.log(error);
    }
}
ans();
