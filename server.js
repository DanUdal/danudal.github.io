const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const http = require('http');
const server = http.createServer(app);
const res = require('express/lib/response');

app.use(session({
	secret: 'secretidhere',
	resave: true,
	saveUninitialized: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});