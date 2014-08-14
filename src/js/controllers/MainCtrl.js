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

  $scope.init();
}