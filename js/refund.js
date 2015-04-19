angular.module('refundApp', [])
  .controller('refundController', function($scope,$http,$timeout) {
      
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
            trip["forecast"] = resp.data.Forecast.LowestPredictedFare;
        }, function(err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });   
    }
      
    $scope.description = "Your upcoming travels";
    $scope.tableFields = ["from","to","date","time","return date","return time","airline"];
    $scope.dollarFields = ["buying price","current price","change fee","forecast"];
    $scope.trips = [
        {
            from: "JFK",
            to: "LAX",
            "date": "2015-05-10",
            "time": "9:05 AM",
            "return date": "2015-05-13",
            "return time": "10:05 AM",
            airline: "Delta",
            "buying price": 468,
            "current price": 359,
            "change fee": 50
        },
        {
            from: "JFK",
            to: "MIA",
            "date": "2015-05-15",
            "time": "9:45 AM",
            "return date": "2015-05-18",
            "return time": "8:35 AM",
            airline: "Delta",
            "buying price": 257,
            "current price": 289,
            "change fee": 50
        },
        {
            from: "JFK",
            to: "SJU",
            "date": "2015-05-22",
            "time": "16:50 AM",
            "return date": "2015-05-27",
            "return time": "12:10 AM",
            airline: "Delta",
            "buying price": 320,
            "current price": 430,
            "change fee": 50
        }
        ];
        
    angular.forEach($scope.trips, function(trip) {
      retrieveForecast(trip);
    });
    
    $scope.minutes = 27;
    $scope.counter = 39;
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter == 0) {
            $scope.counter = 59;
            $scope.minutes--;
        }
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
  });