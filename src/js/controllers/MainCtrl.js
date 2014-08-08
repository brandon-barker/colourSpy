function MainCtrl($scope, $log) {
  $scope.colours = [];

  $scope.init = function () {
    chrome.runtime.onMessage.addListener(function (response) {
      if (response.type == 'colours') {
        $scope.colours = response.data;
        $scope.$apply();
      }
    });
  };

  $scope.init();
}