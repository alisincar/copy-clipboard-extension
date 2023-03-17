function handleCopyEvent() {
    navigator.clipboard.readText().then((copiedText) => {
      console.log("Kopyalanan metin: ", copiedText);
  
      if (chrome.runtime) {
        chrome.runtime.sendMessage({ action: "updateClipboardHistory", copiedText });
      }
    });
  }
  
  document.addEventListener("copy", handleCopyEvent);
  


  
 
  