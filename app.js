run();

function run() {
    // express server
    const express = require('express')
    const app = express()
    const bodyParser = require("body-parser");

    // body parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  
    var server_port = process.env.YOUR_PORT || process.env.PORT || 80
     // setup directory for static files (html, css, etc.)
     app.use(express.static('public'));
     const prov = require("./api/provision");

     
     app.get('/', function (req, res) {
         res.sendFile('/public/index.html');
     });
     
     app.post('/provision', function (req, res) {
        res.sendFile('/public/provision.html');

    app.use("/api/provision", prov);
    });   
    app.listen(server_port, () => console.log('Example app listening !'))
}