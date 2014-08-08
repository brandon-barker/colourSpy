window.onload = function () {
  chrome.extension.sendMessage({
    type: "get-colours"
  });
}