run();

function run() {
    // express server
    const express = require('express')
    const app = express()
    var server_port = process.env.YOUR_PORT || process.env.PORT || 80
     // setup directory for static files (html, css, etc.)
     app.use(express.static('public'));
     
     app.get('/', function (req, res) {
         res.sendFile('/public/index.html');
     });
     
     app.post('/provision', function (req, res) {
        res.sendFile('/public/provision.html');
    });   
    app.listen(server_port, () => console.log('Example app listening !'))
}