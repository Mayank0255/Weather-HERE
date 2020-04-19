require('dotenv').config;

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    request    = require('request'),
    methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json({
    limit: '1mb'
}));

var coords;

app.get("/", function (req, res) {
    // request("https://api.darksky.net/forecast/c2e54b2deabb67ad08881a8c0fab7033/"+coords.lat+","+coords.long,function(error,response,body){
        // if(!error && response.statusCode == 200){
            // var data = JSON.parse(body);
            // console.log(data+"-"+coords);
            
            res.render("index", {coords: coords});
        // }
    // });
});

app.post("/geoloc", function (req, res) {
    coords = req.body;
    res.json({
        status: 'success',
        latitude: req.body.lat,
        longitude: req.body.long,
    });
});

app.get("/weather/:lat/:long",function(req,res){
    request("https://api.darksky.net/forecast/c2e54b2deabb67ad08881a8c0fab7033/"+coords.lat+","+coords.long,function(error,response,body){
        if(!error && response.statusCode == 200){
            var weatherReport = JSON.parse(body);
            console.log(weatherReport);
            res.render("weather",{lat:req.params.lat,long:req.params.long, weather:weatherReport });
        }
    });
});

app.listen(3000, function () {
    console.log("SERVER STARTED AT 3000");
});