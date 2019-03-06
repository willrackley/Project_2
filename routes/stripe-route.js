var express = require("express");
var path = require('path');
var stripe = require("stripe")("sk_test_ZH7DUdaJ3ezE61Bq4hCnMYIk");
var bodyParser = require("body-parser");



var app = express();





module.exports = function(app) {
//app.get("/", function(req, res) {
   // res.sendFile(path.join(__dirname, "./public/userProfile.html"));
//});
//this is not working
//app.get("/paysucces", function(req, res) {
   // res.sendFile(path.join(__dirname, "./public/paysucces.html"));
//});

app.post('/charge', function(req, res){
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    
    var charge = stripe.charges.create({
        amount: chargeAmount,
        currency:"usd",
        source: token
    }, function(err, charge){
        if(err & err.type ==="StripeCardError"){
            console.log("Your card was declined");
        }
    

});
//res.redirect('/paysucces');
});
}