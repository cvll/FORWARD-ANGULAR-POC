angular.module('gmapModule', [])
.factory('gmapFactory',[function() {
	var map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 32.879632, lng: -117.235687},
      zoom: 15,
      });
  return {
      map: map
    };
}])

.controller('gmapCtrl',['$scope','gmapFactory',function($scope,gmapFactory) {
  // Updates the marker information from location data provided
  var updateMarkers = function() {
    for (var key in $scope.markers) {
      if ($scope.markers.hasOwnProperty(key)) {
        if ($scope.locations[key]){
          $scope.markers[key].setPosition($scope.locations[key].loc);
          $scope.markers[key].setVisible(true);
        } else {
          $scope.markers[key].setVisible(false);
        }
      }  
    }
  }
  
  
  // Init markers
  var createMarkers = function(locs) {
    console.log("Creating markers");
    res = {};
    for (var key in locs) {
      if (locs.hasOwnProperty(key)) {
        res[key] =  new google.maps.Marker({
            position: locs[key].loc,
            map: gmapFactory.map,
      }); 
      }  
    }
    
    return res;
  };
  
  // init markers
  $scope.markers = createMarkers($scope.locations);
  
  // on location change, update markers
  $scope.$watch('locations',function(current,next){
      updateMarkers();
  });
}])
.directive('gmap', function() {
  return {
	 restrict: 'E',
	scope: {
		locations: '='
	},
    template: '<div id="map" ng-controller="gmapCtrl"></div>'
  };
})
