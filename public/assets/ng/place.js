app.controller('PlaceCtrl', [
  '$scope','restService','$routeParams'
  function($scope, restService,$routeParams) {
    console.log($routeParams.placeId)
  }
])