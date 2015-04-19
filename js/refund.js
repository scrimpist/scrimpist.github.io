angular.module('refundApp', [])
  .controller('refundController', function($scope) {
    $scope.description = "Your upcoming travels";
    $scope.tableFields = ["from","to","date","time","airline","buying price","current price","change fee"];
    $scope.trips = [
        {
            from: "SEA",
            to: "JFK",
            date: "05/09/2015",
            time: "9:05 AM",
            airline: "Alaska",
            "buying price": "$457",
            "current price": "$359",
            "change fee": "$50"
        }
        ];
  });