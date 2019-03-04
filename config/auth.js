module.exports = {
    ensureAuthenticated: function(req, res, next) {
        value = req.isAuthenticated();
        console.log(value);
        if (value) {
            console.log ("user is allowed to view content");
            // what to do if we have access
            res.end();
            //return next();
        } else {
            console.log("no access to this page");
            // what to do if no access
            res.end();
        }
    }
}