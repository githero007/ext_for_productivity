let customSites = ['https://www.instagram.coms/reels/1231awewe', 'https://www.instagram.com/reels/DLfBERQPnSD/']
let url = "https://www.instagram.coms/reels/1231awewe"
for (let sites of customSites) {
    if (subDomainMatch(sites, url)) console.log('matches at', sites);
    else console.log('no match');
}
function subDomainMatch(sites, url) {
    let backSlashCount = 0;
    let count = 0;
    let burnerString = '';
    let burnerString2 = '';
    let len = Math.max(url.length, sites.length);
    for (let i = 0; i < len; i++) {
        burnerString += url[i];
        burnerString2 += sites[i];
        if (url[i] == `/`) backSlashCount++;
        if (backSlashCount >= 4) break;
    }
    if (burnerString == burnerString2) return true;
    return false;
}
