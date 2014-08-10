function MainCtrl($scope, $log) {
  $scope.colours = [];

  $scope.init = function () {
    chrome.runtime.onMessage.addListener(function (response) {
      if (response.type == 'colours') {
        $scope.colours = response.data;

        angular.forEach($scope.colours, function (colour) {
          colour.borderColour = Color(colour.hex).darken(0.05).hexString();
        });

        $scope.$apply();
      }
    });
  };

  $scope.init();
}