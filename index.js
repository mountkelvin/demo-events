const io = require('socket.io-client')

const { SITE_KEY } = process.env

if (!SITE_KEY) {
  console.error('Specify site key using SITE_KEY env variable.')
  process.exit(1)
}

const socket = io.connect('https://api.mountkelvin.com', {
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  transports: ['websocket'],
})

socket.on('connect', () => {
  console.log('Connected')
  socket.emit('subscribe', { siteKey: SITE_KEY })
})

socket.on('peripheralInput', ({ data }) => {
  console.log(data)
})
