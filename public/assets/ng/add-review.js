app.controller('AddReviewCtrl', [
  '$scope','restService','$routeParams','$location',
  function($scope, restService,$routeParams, $location) {
    $scope.bgImage = {'background-image':'', 'background-repeat':'no-repeat', 'background-attachment':'fixed','width':'100%'}
    $scope.post_re = {
      start: '',
      finish: '',
      reviewer_id: 1,
      place_id: $routeParams.placeid,
      tags: [],
      ratings: [],
      detail: '',
      summary: '',
      position: ''
    }

    restService.getPlaceById($routeParams.placeid).then(function(responce) {
      $scope.place = responce.data
      $scope.bgImage['background-image'] = "url(http://128.199.76.147:8001/" + responce.data.url + ")"
      console.log($scope)
    });

    restService.getTags().then(function(responce){
      $scope.tags = responce.data
      $scope.pre_tag = {}
      for(var i = 0; i < $scope.tags.length; i++) {
        $scope.pre_tag[$scope.tags[i].id] = {}
        for(var j = 0; j < $scope.tags[i].tags.length; j++) {
          $scope.pre_tag[$scope.tags[i].id][$scope.tags[i].tags[j].id] = false
        }
      }
    });

    restService.getRatingCategories().then(function(responce){
      $scope.ratings = responce.data
      for(var i = 0; i < $scope.ratings.length; i++) {
        $scope.post_re.ratings.push({rating_category: $scope.ratings[i].id, rating_score: '1'})
      }
    })


    $scope.processForm = function() {
      for(var i = 0; i < $scope.tags.length; i++) {
        for(var j = 0; j < $scope.tags[i].tags.length; j++) {
          if($scope.pre_tag[$scope.tags[i].id][$scope.tags[i].tags[j].id]) {
            $scope.post_re.tags.push($scope.tags[i].tags[j].id)
          }
        }
      }
      $scope.post_re.start = new Date($scope.post_re.start)
      $scope.post_re.finish = new Date($scope.post_re.finish)
      restService.createReview($scope.post_re)
      $location.path('/places/' + $routeParams.placeid)
      console.log($scope)
    }

    console.log($scope)

  }
])