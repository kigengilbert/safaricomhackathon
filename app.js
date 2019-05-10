run();

function run() {
    // express server
    const express = require('express')
    const app = express()
    var cors = require('cors');
    var bodyParser = require('body-parser')
    const mysql = require('mysql');
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
    app.use(bodyParser.json())
    var server_port = process.env.YOUR_PORT || process.env.PORT || 80
    // mysql
    const db = mysql.createConnection ({
        host: 'www.db4free.net',
        user: 'gkigen',
        password: '2YCGQhR4V9dfZ4L',
        database: 'safaricomhack'
    });
    
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to database');
    });
    global.db = db;
   
     // setup directory for static files (html, css, etc.)
     app.use(express.static('public'));

     
     app.get('/', function (req, res) {
         res.sendFile('/public/index.html');
     });
     
app.post('/provision',function(req,res){
    
    let sql = "INSERT INTO 'simdb' ('ICCID', 'IMSI', 'Ki', 'PIN1', 'PUC', 'status') VALUES ('1234567', '1234567', 'ssds', '1245', '144556', '1')"
    console.log("IMSI: " +req.body.IMSI)
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
    res.json({ message: "yes...." + req.body.ICCID + "  has been sent"  });
})
      
    app.listen(server_port, () => console.log('Example app listening !'))
}