run();

function run() {
    // express server
    const express = require('express')
    const app = express()
    var cors = require('cors');
    var bodyParser = require('body-parser')
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
    app.use(bodyParser.json())

    // body parser middleware
  
  
    var server_port = process.env.YOUR_PORT || process.env.PORT || 80
     // setup directory for static files (html, css, etc.)
     app.use(express.static('public'));

     
     app.get('/', function (req, res) {
         res.sendFile('/public/index.html');
     });
     
app.post('/provision',function(req,res){
 
    console.log("IMSI: " +req.body.IMSI)
    res.json({ message: "yes...." + req.body.ICCID + "  has been sent"  });
})
      
    app.listen(server_port, () => console.log('Example app listening !'))
}