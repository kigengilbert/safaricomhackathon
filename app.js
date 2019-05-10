run();

function run() {
    // express server
    const express = require('express')
    const app = express()
    var server_port = process.env.YOUR_PORT || process.env.PORT || 80
     // setup directory for static files (html, css, etc.)
     app.use(express.static('public'));
     const provisionSIM = require("./api/provision");
     // server root: static index.html
     app.use("/api/provision", provisionSIM);
     app.get('/', function (req, res) {
         res.sendFile('/public/index.html');
     });
        
    app.listen(server_port, () => console.log('Example app listening !'))
}