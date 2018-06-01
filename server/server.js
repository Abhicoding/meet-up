const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
// const session = require('express-session')
const path = require('path')
const admin = require('./handler/admin')
const user = require('./handler/user')
const event = require('./handler/event')
const attendee = require('./handler/attendee')
const comment = require('./handler/comment')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'))

// API call for admin login
app.post('/api/admin/login', admin)

// API call to get list of events
app.get('/api/event', event.eventList)

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

// API call to create an event
app.post('/api/event/create', event.create)

// app.get('/create', (req, res, next) => {
//   // if (!req.session.email) {
//   res.redirect('/')
//   // // } else {
//   // next()
//   // // }
// })

// API call for user details
app.post('/api/user/get', user.getUserInfo)

// API call for user login
app.post('/api/user/login', user.login)

// API call for user logout
app.get('/logout', user.logout)

// test url
// app.get('/githubauth', (req, res) => {
//   console.log(req.query.code)
//   let code = req.query.code
//   console.log(code)
//   var options = {
//     host: 'https://github.com/login/oauth/access_token',
//     port: 80,
//     // path: '/login/oauth/access_token',
//     method: 'POST',
//     client_id: '5a57bd199dea74e2f36f',
//     client_secret: 'e25b1ef5bb2a79f67af742656b788a84e50104a8',
//     code
//   }

//   var request = http.request(options, function (res) {
//     console.log('STATUS: ' + res.statusCode)
//     console.log('HEADERS: ' + JSON.stringify(res.headers))
//     res.setEncoding('utf8')
//     res.on('data', function (chunk) {
//       console.log('BODY: ' + chunk)
//     })
//   })

//   request.on('error', function (e) {
//     console.log('problem with request: ' + e.message)
//   })

//   // write data to request body
//   request.write('data\n')
//   request.write('data\n')
//   request.end()

// })

// // to render UI...always place it at the bottom
// app.get('*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../build/index.html`))
// })

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
