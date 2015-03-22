app.controller('AddReviewCtrl', [
  '$scope','restService','$routeParams',
  function($scope, restService,$routeParams) {
    restService.getPlaceById($routeParams.id).then(function(res) {
      $scope.place = res.data

      restService.getReviewsByPlaceId($routeParams.id).then(function(resp){
        var reviews = resp.data

        restService.geTags().then(function(re){
          console.log(re.data)
          $scope.tags = re.data
          $scope.short_reviews = reviews
        })
      })
    })
  }
])