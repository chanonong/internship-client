app.controller('PrintCtrl', [
  '$scope','restService','$routeParams',
  function($scope, restService,$routeParams) {
    console.log($routeParams)
  }
])