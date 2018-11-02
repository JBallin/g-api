const express = require('express')
const router = express.Router()
const db = require('../../lib/db')

router.get('/messages', (req, res, next) => {
  const messages = db.messages.findAll()
  res.json(messages)
})

router.get('/messages/:id', (req, res, next) => {
  const message = db.messages.find(req.params.id)
  res.json(message)
})

router.post('/messages', (req, res, next) => {
  const message = db.messages.insert({
    subject: req.body.subject,
    body: req.body.body,
    read: false,
    starred: false,
    labels: [],
  })
  res.json(message)
})

router.patch('/messages', (req, res, next) => {
  console.log('req.body', req.body)
  db.messages.findAll(req.body.messageIds).forEach(message => {
    commands[req.body.command](message, req.body)
  })
  res.status(200)
  res.send(db.messages.findAll())
})

const commands = {
  star (message, body) {
    message.starred = !message.starred
  },

  delete (message, body) {
    db.messages.delete(message.id)
  },

  read (message, body) {
    message.read = body.read
  },

  addLabel (message, body) {
    if (!message.labels.includes(body.label)) {
      message.labels.push(body.label)
    }
  },

  removeLabel (message, body) {
    if (message.labels.includes(body.label)) {
      message.labels.splice(message.labels.indexOf(body.label), 1)
    }
  },
}

module.exports = router
