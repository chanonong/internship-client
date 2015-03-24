app.controller('AddReviewCtrl', [
  '$scope','restService','$routeParams','$location', 'Login',
  function($scope, restService,$routeParams, $location, Login) {
    if($routeParams.reviewid) $scope.state = "EDIT"
    else $scope.state = "ADD"
    $scope.bgImage = {'background-image':'', 'background-repeat':'no-repeat', 'background-attachment':'fixed','width':'100%'}
    $scope.post_re = {
      start: '',
      finish: '',
      reviewer_id: 1,//Login.user.id,
      place_id: $routeParams.placeid,
      tags: [],
      ratings: [],
      detail: '',
      summary: '',
      position: ''
    }

    if($scope.state == "EDIT") {
      console.log('EDIT')
      restService.getReviewById($routeParams.reviewid).then(function(response) {
        $scope.__review = response.data
        console.log(response.data)
        var review = response.data
        $scope.post_re.start = new Date(review.start)
        $scope.post_re.finish = new Date(review.finish)
        $scope.post_re.start.setHours($scope.post_re.start.getHours() - 11)
        $scope.post_re.finish.setHours($scope.post_re.finish.getHours() - 11)
        $scope.post_re.reviewer_id = review.reviewer_id
        $scope.post_re.detail = review.detail
        $scope.post_re.summary = review.summary
        $scope.post_re.position = review.position

        restService.getTags().then(function(responce){
          $scope.tags = responce.data
          $scope.pre_tag = {}
          for(var i = 0; i < $scope.tags.length; i++) {
            $scope.pre_tag[$scope.tags[i].id] = {}
            for(var j = 0; j < $scope.tags[i].tags.length; j++) {
              $scope.pre_tag[$scope.tags[i].id][$scope.tags[i].tags[j].id] = false
            }
          }
          for(var i = 0; i < $scope.__review.tags.length; i++) {
            $scope.pre_tag[$scope.__review.tags[i].tag_category_id][$scope.__review.tags[i].id] = true
          }
        });


        restService.getRatingCategories().then(function(responce){
          $scope.ratings = responce.data
          for(var i = 0; i < $scope.ratings.length; i++) {
            $scope.post_re.ratings.push({rating_category: $scope.ratings[i].id, rating_score: '1'})
          }

          for(var i = 0; i < $scope.__review.ratings.length; i++) {
            for(var j = 0; j < $scope.post_re.ratings.length; j++) {
              if($scope.__review.ratings[i].rating_category_id == $scope.post_re.ratings[j].rating_category) {
                $scope.post_re.ratings[j].rating_score = $scope.__review.ratings[i].score
                break;
              }
            }
          }

        })


      })
    }
    else {
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


    }


    restService.getPlaceById($routeParams.placeid).then(function(responce) {
      $scope.place = responce.data
      $scope.bgImage['background-image'] = "url(http://128.199.76.147:8001/" + responce.data.url + ")"
      console.log($scope)
    });


    


    $scope.processForm = function() {
      $scope.post_re.detail = document.getElementById('myTextarea').value
      for(var i = 0; i < $scope.tags.length; i++) {
        for(var j = 0; j < $scope.tags[i].tags.length; j++) {
          if($scope.pre_tag[$scope.tags[i].id][$scope.tags[i].tags[j].id]) {
            $scope.post_re.tags.push($scope.tags[i].tags[j].id)
          }
        }
      }
      $scope.post_re.start = new Date($scope.post_re.start)
      $scope.post_re.finish = new Date($scope.post_re.finish)

      $scope.post_re.start.setTime($scope.post_re.start.getTime() - $scope.post_re.start.getTimezoneOffset()*60*1000 );
      $scope.post_re.finish.setTime($scope.post_re.finish.getTime() - $scope.post_re.start.getTimezoneOffset()*60*1000 );

      if($scope.state == "ADD") {
        restService.createReview($scope.post_re).then(function(response) {
          $location.path('/places/' + $routeParams.placeid)
        })
      } else {
        restService.editReview($routeParams.reviewid, $scope.post_re).then(function(response) {
          $location.path('/reviews/' + $routeParams.reviewid)
        })
      }
      
      console.log($scope.post_re)
    }

    console.log($scope)
    $scope.Login = Login
  }
])