const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors")
const io = new Server(server);

app.use(cors)
let tableData = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app.jss');
});

io.on('connection', (socket) => {
    socket.emit('updateTable', tableData);
    socket.on('updateTable', (updatedTableData) => {
        tableData = updatedTableData;
        io.emit('updateTable', tableData);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});