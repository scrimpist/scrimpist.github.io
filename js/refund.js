angular.module('refundApp', [])
  .controller('refundController', function($scope,$http) {
      
    var retrieveForecast = function(trip) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        var data = {
            origin        : trip.from,
            destination   : trip.to,
            departuredate : trip.date,
            returndate    : trip["return date"]
          };
        
        $http.post('https://scrimpist-github-io-scrimpist.c9.io/sabre-api',data,config).then(function(resp) {
            console.log(resp);
            trip["forecast"] = "$" + resp.data.Forecast.LowestPredictedFare;
        }, function(err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });   
    }
      
    $scope.description = "Your upcoming travels";
    $scope.tableFields = ["from","to","date","time","return date","return time","airline","buying price","current price","change fee","forecast"];
    $scope.trips = [
        {
            from: "JFK",
            to: "LAX",
            "date": "2015-05-10",
            "time": "9:05 AM",
            "return date": "2015-05-15",
            "return time": "10:05 AM",
            airline: "Alaska",
            "buying price": "$457",
            "current price": "$359",
            "change fee": "$50"
        }
        ];
        
    angular.forEach($scope.trips, function(trip) {
      retrieveForecast(trip);
    });
    
  });