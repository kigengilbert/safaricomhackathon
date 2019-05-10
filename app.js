run();

function run() {
    // express server
    const express = require('express')
    const app = express()

     // setup directory for static files (html, css, etc.)
     app.use(express.static('public'));

     // server root: static index.html
     app.get('/', function (req, res) {
         res.sendFile('index.html');
     });
        
    app.listen(3000, () => console.log('Example app listening on port 3000!'))
}