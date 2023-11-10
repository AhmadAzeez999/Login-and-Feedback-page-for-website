const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = express();
const mailer = require('nodemailer');
const path = require('path');
const session = require('express-session');
const MongoConnect = require('connect-mongodb-session')(session);
const http = require('http'); // Require the http module
const server = http.createServer(app); // Create an HTTP server using your Express app
const parser = require('body-parser');

const route_controller = require('./app_routes');
 // Create a Socket.io server and attach it to the HTTP server

// Use express.json() for parsing JSON request bodies
app.use(express.json());
// Serve static files from the 'templates' directory
app.use(express.static(path.join(__dirname, '/')));

// Use express.urlencoded() for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// This middleware is to create and manage sessions for authenticated users

const store = new MongoConnect(
{uri: process.env.CONN_STRNG,
collection: 'tech-user-sessions',
clear_interval: 360000}
);

app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: true,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 360000
    }
})
);

app.use('/', route_controller);
app.get('*', (req, res) => {
    const url = req.url;
    if(url.endsWith('.html')){
        res.status(403).json({
            status: "Forbidden",
            msg: {}
        });
    }
});

//connecting to mongo DB 
mongoose.connect(process.env.CONN_STRNG,{useNewUrlParser: true}).then((conn) =>{
    console.log("Database connection successful");
});
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log("App Server listning");
});