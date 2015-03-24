app.controller('ReviewCtrl', [
  '$scope','restService','$routeParams','$location','Login',
  function($scope, restService,$routeParams, $location, Login) {

    $scope.bgImage = {'background-image':'', 'background-repeat':'no-repeat', 'background-attachment':'fixed','width':'100%'}

  	restService.getReviewById($routeParams.id).then(function(res) {
  		console.log(res.data)
  		$scope.review = res.data
      restService.getPlaceById($scope.review.place_id).then(function(resp) {
        $scope.place = resp.data
        $scope.bgImage['background-image'] = "url(http://128.199.76.147:8001/" + resp.data.url + ")"
      })
  		// restService.getReviewsByPlaceId($routeParams.id).then(function(resp){
  		// 	console.log(resp.data)
  		// 	$scope.short_reviews = resp.data
  		// })
      restService.getStudentById($scope.review.reviewer_id).then(function(student){
        console.log(student.data.name)
        $scope.review.reviewer_name = student.data.name
      })
  	})

    $scope.edit = function() {
      $location.path('/edit-review/' + $scope.review.place_id + '/'+ $routeParams.id)
    }
    $scope.Login = Login
  }
])