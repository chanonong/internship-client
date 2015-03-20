app.controller('PlacesCtrl', [
  '$scope','restService','$routeParams'
  function($scope, restService,$routeParams) {

    restService.getPlace().then(function(res) {
      var places = res.data
      restService.getTag().then(function(resp) {
        var tags = resp.data
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })
  }
])