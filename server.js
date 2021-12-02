// const express = require('express')
// const path = require('path')
// const http = require('http')
// const PORT = process.env.PORT || 3000
// const socketio = require('socket.io')
// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)


// // app.use(express.static('public'));
// // const http = require('http').Server(app);


// app.use(express.static(path.join(__dirname, "public")))

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// var connections = [null, null]

// io.on('connection', socket => {
//     console.log('New connection');

//     let playerIndex = -1;
//     for (const i in connections) {
//         if (connections[i] === null) {
//             playerIndex = i;
//             connections[i] = 1;
//             break;
//         }
//     }

//     socket.emit('player-number', playerIndex)

//     console.log(`Player ${playerIndex} has connected`)

//     if (playerIndex === -1) return

//     socket.broadcast.emit('player-connection', { i: playerIndex, cn: connections });

//     socket.emit('check-players', connections)

//     socket.on('disconnect', () => {
//         console.log(`Player ${playerIndex} disconnected`)
//         connections[playerIndex] = null
//         socket.broadcast.emit('player-connection', { i: playerIndex, cn: connections });
//     })

//     socket.on('request', () => {
//         socket.broadcast.emit('request');
//     })



//     socket.on('projectile1', vel => {
//         socket.broadcast.emit('projectile1', vel);
//     });

//     socket.on('projectile2', vel => {
//         socket.broadcast.emit('projectile2', vel);
//     });

//     socket.on('enemy', function(data) {
//         socket.broadcast.emit('enemy', {xc: data.xc, yc: data.yc, rad: data.rad,
//             cl: data.cl, cn: data.cn, vl: data.vl });
//     })

//     socket.on('gameOver', () => {
//         socket.broadcast.emit('gameOver');
//     })

//     socket.on('restart', () => {
//         socket.broadcast.emit('restart');
//     })

//     socket.on('changeTurn', () => {
//         socket.broadcast.emit('changeTurn');
//     })

//     socket.on('clicked', function(data) {
//         var rowNum = data.rn;
//         var colNum = data.cn;
//         socket.broadcast.emit('clicked', { rn : rowNum, cn: colNum})
//     })

// })