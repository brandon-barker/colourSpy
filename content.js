function getColours() {
  var colours = {};
  var properties = ['background-color', 'color'];
  var nodes = document.querySelectorAll('*');

  $(nodes).each(function (key, node) {
    $(properties).each(function (i, property) {
      var colour = window.getComputedStyle(node)[property];

      if (colour != 'rgb(255, 255, 255)' && colour != 'rgba(0, 0, 0, 0)' && colour != 'rgb(0, 0, 0)') {
        colours[colour] = colour;
//        colours.push({
//          rgb: colour
//        });
      }
    });
  });

  var distinctColours = [];

  Object.getOwnPropertyNames(colours).forEach(function (val) {
    distinctColours.push({
      rgb: val
    })
  });

  if (distinctColours.length > 0) {
    chrome.runtime.sendMessage({type: 'colours', data: distinctColours});
  }
}

chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case "request-colours":
      getColours();
      break;
  }
});