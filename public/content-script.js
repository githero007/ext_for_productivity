let blockedSites = {
    "Social Media": true,
    "Youtube": false,
    "BrainRot": false
};
let customWeb = []
let flag = 0;
let currentURL = "";


chrome.storage.local.get(["blockedSites", "customWeb"], (result) => {
    blockedSites = result.blockedSites || blockedSites;
    customWeb = result.customWeb || customWeb;
    ans();
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.updatedSite) { blockedSites = request.updatedSite; }
    if (request.customSite) {
        let input = request.customSite;
        // Add protocol if missing
        let host = [];
        input = input;
        for (let i = 0; i < input.length; i++) {
            let url = input[i].toString();
            if (url.startsWith("http://") && !url.startsWith("https://")) {
                url = "http://" + input[i];
            }
            console.log(url);
            host.push(url);
        }
        customWeb = host;
        chrome.storage.local.set({ customWeb: customWeb });
    }
    chrome.storage.local.set({ blockedSites: blockedSites });
    console.log(blockedSites);
    sendResponse({ newSites: blockedSites });

    if (currentURL !== "") {
        flag = 1;
        ans();
    }
    return true;
});


chrome.runtime.sendMessage({ type: "getTabInfo" }, (response) => {
    if (response?.error) {
        console.error("Error getting tab info:", response.error);
    } else {
        console.log("Active tab URL:", response?.url);
        currentURL = response.url;
        ans();
    }
});


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

function matches(url, collections) {
    console.log('matching at custom site', url);
    return collections.some(domain => url.includes(domain));
}

const ans = () => {
    if (!currentURL) return;

    const url = currentURL;
    const blockSocial = blockedSites["Social Media"] && matches(url, socialMedia);
    const blockYoutube = blockedSites["Youtube"] && matches(url, youTube);
    const blockBrainRot = blockedSites["BrainRot"] && matches(url, brainRot);
    const blockCustom = matches(url, customWeb);

    if (blockSocial || blockYoutube || blockBrainRot || blockCustom) {
        document.body.innerHTML = `
                <iframe class="blocker-iframe" src="${chrome.runtime.getURL("index.html")}" frameborder="0" 
                style="width:100vw; height:100vh; border:none;"></iframe>`;
        flag = 1;

    } else {
        if (flag === 1) {
            location.reload();
            flag = 0;
        }
    }
};
