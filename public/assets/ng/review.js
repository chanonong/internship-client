app.controller('ReviewCtrl', [
  '$scope','restService','$routeParams',
  function($scope, restService,$routeParams) {
  	restService.getReviewById($routeParams.id).then(function(res) {
  		console.log(res.data)
  		$scope.review = res.data

  		// restService.getReviewsByPlaceId($routeParams.id).then(function(resp){
  		// 	console.log(resp.data)
  		// 	$scope.short_reviews = resp.data
  		// })
  	})
  }
])