// One of the payment methods. Not finished.
var stripe = require("stripe")("sk_test_ZH7DUdaJ3ezE61Bq4hCnMYIk");
module.exports = function(app) {
	app.post('/charge', function(req, res) {
		var token = req.body.stripeToken;
		var chargeAmount = req.body.chargeAmount;
		var charge = stripe.charges.create({
			amount: chargeAmount,
			currency: "usd",
			source: token
		}, function(err, charge) {
			if (err & err.type === "StripeCardError") {
				console.log("Your card was declined");
			}
		});
	});
}