angular.module('vdb',[])
  .factory('dataHandler',[function() {
    var CAR_TYPES = ['All','Car','Truck','Van'];
    var CAR_SIZE = ['All','Small','Medium','Large'];

    var getRandom = function(min, max) {
      return Math.random() * (max - min) + min;
    };
    
    var randomData = function() {
      var NUM_OF_MARKERS = 5;
      var car;
      var size;
      var weight;
      var lat;
      var long;
      var res = [];
      
      for (var i = 0 ; i < NUM_OF_MARKERS ; i++) {
        car = CAR_TYPES[Math.floor(getRandom(1,4))];
        size = CAR_SIZE[Math.floor(getRandom(1,4))];
        weight = Math.floor(getRandom(0,600));
        lat = 32.882206 + Math.random() / 100000;
        long = -117.229898 + Math.random() / 100000;
        res.push({id:i,loc: {lat:lat, lng:long},type: car,size:size,weight:weight,visibility:true});
      }

      return res;
    };
 
 var sign_flag = false;
    var refresh = function(curr_data) {
      for (var i = 0 ; i < curr_data.length ; i++) {
        var lat;
        var lng;
        var newLoc;
        if (sign_flag) { 
          lat = curr_data[i].loc.lat + (Math.random()/1000);
          lng = curr_data[i].loc.lng + (Math.random()/1000);
        } else {
          lat = curr_data[i].loc.lat - (Math.random()/1000);
          lng = curr_data[i].loc.lng - (Math.random()/1000);
        }
        sign_flag = !sign_flag;
        newLoc = {lat: parseFloat(lat), lng: parseFloat(lng)};
        curr_data[i].loc = newLoc;
      }
      data = curr_data;
      return curr_data;
    };
  
  var data = randomData();
  
    return {
      refresh:refresh,
      data:data
    };
  }]);