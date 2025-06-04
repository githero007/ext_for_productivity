document.body.innerHTML = "";
const ans = async () => {
    try {
        let response = await fetch(chrome.runtime.getURL("index.html"));
        let text = await response.text();
        console.log(text);
        document.body.innerHTML = `
  <iframe src="${chrome.runtime.getURL("index.html")}" style="width:100vw; height:100vh; border:none;"></iframe>
`;

    } catch (error) {
        console.log(error);
    }
}
ans();
