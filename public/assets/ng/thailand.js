app.controller('InternshipCtrl', [
  '$scope','restService',
  function($scope, restService) {

    restService.getPlace().then(function(res) {
      var places = res.data
      restService.getTag().then(function(resp) {
        var tags = resp.data
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })
  }
])