app.controller('PlaceCtrl', [
  '$scope','restService','$routeParams',
  function($scope, restService,$routeParams) {
  	restService.getPlaceById($routeParams.id).then(function(res) {
  		console.log(res.data)
  		$scope.place = res.data

  		restService.getReviewsByPlaceId($routeParams.id).then(function(resp){
  			var reviews = resp.data
        var category = new Array(reviews[0].ratings.length+1).join('0').split('').map(parseFloat)
        var ratings = reviews.forEach(function(review) {
          review.ratings.forEach(function(rating) {
            category[rating.rating_category_id - 1] += rating.score
          })
        })
        var arr = []
        for(var i = 1; i <= reviews[0].ratings.length ; ++i) {
          arr.push({ 'id' : i , 'score' : category[i-1] / reviews.length})
        }

        //console.log(arr)
        $scope.avg_ratings = arr
  			$scope.short_reviews = reviews

  		})
  	})
  }
])