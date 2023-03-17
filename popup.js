const clipboardItems = document.getElementById("clipboardItems");

function updateClipboardItems() {
  chrome.storage.local.get("clipboardHistory", ({ clipboardHistory }) => {
    const reversedHistory = clipboardHistory.slice(-100);

    reversedHistory.forEach((item, index) => {
      const li = document.createElement("li");
      li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start px-1 py-2 my-1");
      const div = document.createElement("div");
      const divRight = document.createElement("div");
      divRight.setAttribute("style", "max-width:70px;text-align: right;");
      div.setAttribute("class", "ms-2 me-auto text-break");
      div.setAttribute("style", "font-size:0.85em");
      div.textContent = item;
      const copyButton = document.createElement("span");
      copyButton.setAttribute("class", "badge bg-primary rounded-pill");
      copyButton.setAttribute("style", "cursor:pointer");
      copyButton.textContent = "Copy";
      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(item);
      });

      const deleteButton = document.createElement("span");
      deleteButton.setAttribute("class", "badge bg-danger rounded-pill");
      deleteButton.setAttribute("style", "cursor:pointer");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteFromClipboard( index);
      });

      li.appendChild(div);
      divRight.appendChild(copyButton);
      divRight.appendChild(deleteButton);
      li.appendChild(divRight);
      clipboardItems.prepend(li);
    });
  });
}

function deleteFromClipboard(index) {
  chrome.storage.local.get("clipboardHistory", ({ clipboardHistory }) => {
    console.log("clipboardHistory", clipboardHistory);
    console.log("index", index);
    clipboardHistory.splice(index, 1);
    console.log("clipboardHistory", clipboardHistory);
    chrome.storage.local.set({ clipboardHistory });
  });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.clipboardHistory) {
    clipboardItems.innerHTML = "";
    updateClipboardItems();
  }
});

updateClipboardItems();
