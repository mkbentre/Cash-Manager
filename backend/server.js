var fs = require('fs');
// var http = require('http');
var https = require('https');
var express = require('express');
var app = express()
var privateKey = fs.readFileSync( 'privatekey.pem' );
var certificate = fs.readFileSync( 'certificate.pem' );
require('dotenv').config()
var AuthMiddleWare = require('./app/common/AuthMiddleWare')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./app/routers/auth.router')(app);
app.use(AuthMiddleWare.isAuth);
// require('./app/routers/user.router')(app);
require('./app/routers/wallet.router')(app);
require('./app/routers/cataloge.router')(app);
require('./app/routers/transaction.router')(app);
// app.listen(process.env.PORT, function() {
//     console.log("Server started on PORT: " + process.env.PORT);
// });

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(process.env.PORT);