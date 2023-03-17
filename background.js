const maxClipboardHistory = 100;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardHistory: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateClipboardHistory") {
    const copiedText = request.copiedText;

    console.log("Arka planda kopyalanan metin: ", copiedText);

    chrome.storage.local.get("clipboardHistory", ({ clipboardHistory }) => {
      if (!clipboardHistory.includes(copiedText)) {
        clipboardHistory.push(copiedText);
        if (clipboardHistory.length > maxClipboardHistory) {
          clipboardHistory.shift();
        }
        chrome.storage.local.set({ clipboardHistory });
      }
    });
  }
});
