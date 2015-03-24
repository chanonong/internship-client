app.controller('InternshipThaiCtrl', [
  '$scope','restService',
  function($scope, restService) {
    restService.getPlaceThailand().then(function(res) {
      var places = res.data
      console.log(places)
      restService.getTag().then(function(resp) {
        var tags = resp.data
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })
  }
])

app.controller('InternshipOverseasCtrl', [
  '$scope','restService',
  function($scope, restService) {

    restService.getPlaceOverseas().then(function(res) {
      var places = res.data
      restService.getTag().then(function(resp) {
        var tags = resp.data
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })
  }
])