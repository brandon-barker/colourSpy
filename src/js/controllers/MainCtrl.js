function MainCtrl($scope, $log) {
  $scope.colours = [];
  $scope.mode = 'hex';

  $scope.init = function () {
    chrome.runtime.onMessage.addListener(function (response) {
      if (response.type == 'colours') {
        $scope.colours = response.data;

        angular.forEach($scope.colours, function (colour) {
          colour.borderColour = Color(colour.hex).darken(0.15).hexString();
        });

        $scope.$apply();
      }
    });
  };

  $scope.export = function (type) {
    var filteredColours = _.pluck($scope.colours, $scope.mode);
    var content = '';
    var prefix = type === 'scss' ? '$' : type === 'less' ? '@' : '#';
    var suffix = type === 'css' ? '.css' : type === 'scss' ? '.scss' : type === 'less' ? '.less' : type === 'json' ? '.json' : '.txt';
    var mimeType = 'text/plain;charset=utf-8';

    if (type === 'css' || type === 'scss' || type === 'less') {
      angular.forEach(filteredColours, function (colour, index) {
        var keyword = new Color(colour).keyword() || 'colour' + index;
        content += prefix + keyword + ': ' + colour + '; \n';
      });
    }

    if (type === 'json') {
      mimeType = 'application/json;charset=utf-8';
      content = JSON.stringify(filteredColours);
    }

    if (type === 'plain')
      content = filteredColours.join('; \n');

    saveAs(new Blob(_.toArray(content), {type: mimeType}), "colourSpy" + suffix);
  };

  $scope.init();
}