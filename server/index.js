const express = require("express")
const http = require('http')
const Server = require("socket.io").Server
const app = express()


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

// when client connects to server
io.on("connection", (socket) => {
    console.log('We are Connected')

    socket.on("chat", (chat) => {
        io.emit('chat', chat)
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})

server.listen(3001, () => {
    console.log("Listening at 3001")
})
























// https://mat6tube.com/watch/-193744863_456240223