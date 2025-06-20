let blockedSites = {
    "Social Media": false,
    "Youtube": false,
    "BrainRot": false
};
let flag = 0;
let currentURL = "";


chrome.storage.local.get(["blockedSites"], (result) => {
    blockedSites = result.blockedSites || blockedSites;
    console.log("Loaded blockedSites on page load:", blockedSites);
    ans();
});

// Listen for messages from popup / background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    blockedSites = request.updatedSite;
    chrome.storage.local.set({ blockedSites }); // Persist the new settings

    sendResponse({ reply: "Updated block settings", newSites: blockedSites });

    if (currentURL !== "") {
        flag = 1;
        ans();
    }
    return true; // To indicate async response
});

// Get the current tab URL
chrome.runtime.sendMessage({ type: "getTabInfo" }, (response) => {
    if (response?.error) {
        console.error("Error getting tab info:", response.error);
    } else {
        console.log("Active tab URL:", response?.url);
        currentURL = response.url;
        ans();
    }
});

// Helper collections
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
];

const brainRot = [
    "youtube.com/shorts",
    "instagram.com/reels"
];

// Matching function
function matches(url, collections) {
    const hostname = new URL(url).hostname;
    return collections.some(domain => hostname.includes(domain));
}

// The main logic
const ans = () => {
    if (!currentURL) return;

    const url = currentURL;
    const blockSocial = blockedSites["Social Media"] && matches(url, socialMedia);
    const blockYoutube = blockedSites["Youtube"] && matches(url, youTube);
    const blockBrainRot = blockedSites["BrainRot"] && matches(url, brainRot);

    if (blockSocial || blockYoutube || blockBrainRot) {
        if (!document.querySelector("iframe.blocker-iframe")) {
            document.body.innerHTML = `
                <iframe class="blocker-iframe" src="${chrome.runtime.getURL("index.html")}" frameborder="0" 
                style="width:100vw; height:100vh; border:none;"></iframe>`;
            flag = 1;
        }
    } else {
        if (flag === 1) {
            console.log("Unblocking, reloading original page...");
            location.reload(); // Reload to restore site content
            flag = 0;
        }
    }
};
