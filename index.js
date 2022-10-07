const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors('*'))

app.get('/', (req, res) => {
  res.send('Welcome to web sockets')
})

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log('someone just connected')

  socket.on('new message from frontend', payload => {
    console.log(`New message from ${payload.from}: ${payload.content}`)

    io.sockets.emit('new message from backend', payload)
  })

  socket.on('disconnect', () => {
    console.log('someone disctonnected')
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
