chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type) {
    case "get-colours":
      sendGetColoursRequest();
      break;
  }
  return true;
});

var sendGetColoursRequest = function() {
  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.sendMessage(tab.id, {type: "request-colours", color: "#F00"});
  });
}