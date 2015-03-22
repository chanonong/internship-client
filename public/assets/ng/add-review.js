app.controller('AddReviewCtrl', [
  '$scope','restService','$routeParams',
  function($scope, restService,$routeParams) {
    restService.getPlaceById($routeParams.placeid).then(function(res) {
      $scope.place = res.data

      restService.getReviewsByPlaceId($routeParams.placeid).then(function(resp){
        var reviews = resp.data
        restService.getTags().then(function(re){

          restService.getRatingCategories().then(function(ratings){
            $scope.ratings = ratings.data

          })
          $scope.tags = re.data
          $scope.short_reviews = reviews
        })
      })
    })
  }
])