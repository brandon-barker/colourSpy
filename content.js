function getColours() {
  var colours = [];
  var nodes = document.querySelectorAll('*');

  $(nodes).each(function (key, node) {
    var bgColour = window.getComputedStyle(node)['background-color'];

    if (bgColour != 'rgb(255,255,255)' && bgColour != 'rgba(0, 0, 0, 0)') {
      colours.push({
        rgb: bgColour
      });
    }
  });

  if (colours.length > 0) {
    chrome.runtime.sendMessage({type: 'colours', data: colours});
  }
}

chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case "request-colours":
      getColours();
      break;
  }
});