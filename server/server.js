const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis')
const client = redis.createClient()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')
const multer = require('multer')
const admin = require('./handler/admin')
const user = require('./handler/user')
const event = require('./handler/event')
const attendee = require('./handler/attendee')
const comment = require('./handler/comment')

const app = express()
const PORT = 3000

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './build/images')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({ storage })

app.use(session({
  secret: 'ssshhhhh',
  store: new RedisStore({host: 'localhost', port: 6379, client: client, ttl: 260}),
  saveUninitialized: false,
  resave: false
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'))

// API call to get list of events
app.get('/api/event', event.eventList)

// API call to create an event
app.post('/api/event', upload.single('file'), event.create)

// API call to edit an event
app.put('/api/event', upload.single('file'), event.edit)

//  API call to get details of a particular event
app.get('/api/event/:id', event.eventDetails)

//  API call to save an attendee for a particular event
app.post('/api/event/attendee', attendee.saveAttendee)

//  API call to remove an attendee for a particular event
app.post('/api/event/attendee/cancel', attendee.deleteAttendee)

//  API call to save a comment for a particular event
app.post('/api/event/comment', comment.saveComment)

//  API call to delete a comment for a particular event
app.delete('/api/event/comment', comment.deleteComment)

// API call for user details
app.post('/api/user/get', user.getUserInfo)

// API call for user login
app.post('/api/user/login', user.login)

// API call for user logout
app.get('/logout', user.logout)

// Authenticate Admin
app.get('/admin', admin.authorize)

app.get('/admin/create', admin.authenticate)

app.get('/admin/dashboard', admin.authenticate)

// to render UI...always place it at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`))
})

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
