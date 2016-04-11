// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(express.static("./public"));

app.get("/", function(req, res) {
    res.sendFile("./public/index.html");
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
