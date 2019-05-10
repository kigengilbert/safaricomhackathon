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
     //end point for provisioning sim
app.post('/provisionSIM',function(req,res){
    
    var sql3="SELECT * FROM simdb WHERE (ICCID ="+ req.body.ICCID +")"
    db.query(sql3, function (err, result) {
        if (err) throw err;
        if(result.length==1){
            res.json({ response_code: 1   });
        }else{

            var sql = "INSERT INTO simdb (ICCID, IMSI,Ki,PIN1,PUC,status) VALUES (" + req.body.ICCID +","+ req.body.IMSI+","+req.body.Ki+","+req.body.PIN1+","+req.body.PUC+","+req.body.Status+")"
            console.log("IMSI: " +req.body.IMSI)
            console.log("ICCID: " +req.body.ICCID)
            console.log("Ki: " +req.body.Ki)
            console.log("PIN1: " +req.body.PIN1)
            console.log("PUC: " +req.body.PUC)
            console.log("status: " +req.body.Status)
            
            
                db.query(sql, function (err, result2) {
                    if (err) throw err;
                    res.json({ response_code: 0  });
                  });
        }
      });

    
          
   
    
   
})
      
app.post('/activateSIM',function(req,res){
    var resultcode=0;
     var sql="SELECT * FROM simdb WHERE (ICCID ="+ req.body.ICCID+ " AND IMSI ="+req.body.IMSI+")"

       console.log("IMSI: " +req.body.IMSI)
        console.log("ICCID: " +req.body.ICCID)
        db.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length==1){
                console.log(result[0].status)
                if(result[0].status==0){
                    var sql2 = "UPDATE simdb SET MSISDN ="+req.body.MSISDN+",status = 1  WHERE IMSI =" +req.body.IMSI;
                   
                    db.query(sql2, function (err, result) {
                        if (err) throw err;
                        console.log("DONE");
                        resultcode=0;
                        res.json({ response_code: 0  });
                      });
                }else{
                    res.json({ response_code: 2  });
                }
            
            }else{
                res.json({ response_code: 0   });
            }
          });
       
   })
   app.post('/querySubscriberInfo',function(req,res){
    var resultcode=0;
     var sql="SELECT * FROM simdb WHERE (MSISDN ="+ req.body.MSISDN + ")"

       
        db.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length==1){
                console.log(result[0].status)
                if(result[0].status==0){
                      res.json(result);
                }else{
                    res.json(result);
                }
            
            }else{
                res.json({ response_code: 0   });
            }
          });
       
   })

   
    app.listen(server_port, () => console.log('Example app listening !'))
}