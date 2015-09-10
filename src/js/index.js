
var app = angular.module('app',['vdb','gmapModule']);

app.controller('appCtrl',['$scope','$interval','dataHandler','gmapFactory',function($scope,$interval,dataHandler,gmapFactory) {
      var createLocations = function(d) {
            var res = {};
            for (var i = 0 ; i < d.length ; i++) {
                  res[i] = {id:i,loc:d[i].loc,visibility:true};
            }
            return res;
      }
      
      var updateLocations = function(d) {
            var new_locations = {};
            for (var i = 0 ; i < d.length ; i++) {
                  if (d[i].visibility)
                        new_locations[i] = d[i];
            }
            $scope._locations = new_locations;
      };
      
      // Possible types for drop downs
	$scope.CAR_TYPES = ['All','Car','Truck','Van'];
	$scope.CAR_WEIGHTS = [0,100,200,300,400,500];
	$scope.CAR_SIZES = ['All','Small','Medium','Large'];

      // Default values
	$scope.carType ='All';
	$scope.carWeight = '0';
	$scope.carSize = 'All';


      // Accumulated data
	$scope.data = dataHandler.data;
      
      // init location data
      $scope._locations = createLocations($scope.data);
      
      
      
      // Triggers when something about the data is changed
	$scope.$watch("[data,carType,carWeight,carSize]",function(current,next) {
      for (var i = 0 ; i < $scope.data.length ; i++) {
        var curr = $scope.data[i];
		
        if ((curr.type == $scope.carType || $scope.carType == 'All') &&
            (curr.size == $scope.carSize || $scope.carSize == 'All' ) &&
             curr.weight >= $scope.carWeight) {
              curr.visibility = true;
        } else {
              curr.visibility = false;
        }
      }
      
      // Updates accumulated data and reflect changes in location data
      updateLocations($scope.data);
      
	},true);
      
	// Constantly updates locations of ORIGINAL_DATA  
    $interval(function() {
      dataHandler.refresh($scope.data);

     }, 200);
}]);
