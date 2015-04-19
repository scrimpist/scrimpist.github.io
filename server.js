var SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight');
var sabre_dev_studio_flight = new SabreDevStudioFlight({
  client_id:     'V1:1234:ABCD:XYZ',
  client_secret: 'SeKr1T',
  uri:           'https://api.test.sabre.com'
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/sabre-api', function (req, res) {
    var options = {
        origin        : req.body.origin,
        destination   : req.body.destination,
        departuredate : req.body.departuredate,
        returndate    : req.body.returndate
      };
    var callback = function(error, data) {
      if (error) {
        console.log(error);
      } else {
        res.send(JSON.stringify(JSON.parse(data)));
      }
    };
    sabre_dev_studio_flight.low_fare_forecast(options, callback);
});

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});