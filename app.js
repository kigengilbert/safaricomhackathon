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
        } } );
     // setup directory for static files (html, css, etc.)
     app.use(express.static('public'));

     
     app.get('/', function (req, res) {
         res.sendFile('/public/index.html');
     });
     
app.post('/provisionSIM',function(req,res){
    
 //  let sql = "INSERT INTO simdb (ICCID0, 'IMSI', 'Ki', 'PIN1', 'PUC', 'status') VALUES ('1234567', '1234567', 'ssds', '1245', '144556', '1')"
    var sql = "INSERT INTO simdb (ICCID, IMSI,Ki,PIN1,PUC,status) VALUES (" + req.body.ICCID +","+ req.body.IMSI+","+req.body.Ki+","+req.body.PIN1+","+req.body.PUC+","+req.body.Status+")"
    console.log("IMSI: " +req.body.IMSI)
    console.log("ICCID: " +req.body.ICCID)
    console.log("Ki: " +req.body.Ki)
    console.log("PIN1: " +req.body.PIN1)
    console.log("PUC: " +req.body.PUC)
    console.log("status: " +req.body.Status)
    
    
        console.log('Connected to database');
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
          
   
    
    res.json({ message: "yes...." + req.body.ICCID + "  has been sent"  });
})
      
app.post('/activateSIM',function(req,res){
    

    var sql="SELECT * FROM simdb WHERE (ICCID ="+ req.body.ICCID+ " AND IMSI ="+req.body.IMSI+")"

       console.log("IMSI: " +req.body.IMSI)
        console.log("ICCID: " +req.body.ICCID)
        db.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length==1){
                console.log(result[0].status)
                if(result[0].status==0){
                    var sql2 = "INSERT INTO simdb (status,MSISDN) VALUES ("+ req.body.MSISDN +",1)"
                    db.query(sql2, function (err, result) {
                        if (err) throw err;
                        console.log("DONE");
                      });
                }else{}
            
            }
          });
       res.json({ message: "yes...." + req.body.ICCID + "  has been sent"  });
   })

   
    app.listen(server_port, () => console.log('Example app listening !'))
}