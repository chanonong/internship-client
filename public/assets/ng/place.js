app.controller('PlaceCtrl', [
  '$scope','restService','$routeParams', '$location', 'Login',
  function($scope, restService,$routeParams, $location, Login) {
    console.log(Login)
    $scope.bgImage = {'background-image':'', 'background-repeat':'no-repeat', 'background-attachment':'fixed','width':'100%'}
  	restService.getPlaceById($routeParams.id).then(function(res) {
      $scope.bgImage['background-image'] = "url(http://128.199.76.147:8001/" + res.data.url + ")"
      console.log($scope)
      console.log($scope.bgImage)
  		$scope.place = res.data
      console.log($scope.place)
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
        reviews.forEach(function(review) {
          console.log(review)
          restService.getStudentById(review.reviewer_id).then(function(student){
            console.log(student.data.name)
            review.reviewer_name = student.data.name
          })
        })
        $scope.short_reviews = reviews
        restService.getRatingCategories().then(function(re){
          for(var j = 1; j <= arr.length ; ++ j) {
            arr[j-1].name = re.data.filter(function(y){
              return y.id == arr[j-1].id
            })[0].name
          }

          $scope.avg_ratings = arr
        })
  		})
  	})


    


    $scope.edit = function() {
      $location.path('/edit-place/' + $routeParams.id)
    }
    $scope.Login = Login
  }
])