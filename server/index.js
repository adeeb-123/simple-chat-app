import { Server } from "socket.io";

const io = new Server(3001)

io.on('connection', (socket) => {
    socket.emit('Welcome', 'Welcome to the channel')

    socket.on("msg", (data) => {
        console.log("msg fron client", data)
    })
})