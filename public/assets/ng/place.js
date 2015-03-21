app.controller('PlaceCtrl', [
  '$scope','restService','$routeParams',
  function($scope, restService,$routeParams) {
  	restService.getPlaceById($routeParams.id).then(function(res) {
  		console.log(res.data)
  		$scope.place = res.data

  		restService.getReviewsByPlaceId($routeParams.id).then(function(resp){
  			console.log(resp.data)
  			$scope.short_reviews = resp.data
  		})
  	})
  }
])