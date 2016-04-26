Mailjet = require '../mailjet/mailjet'
bodyParser = require 'body-parser'
Router = require('express').Router()
allowedWebsites = require './allowed-websites-middleware'
Websites = require './available-websites'
_ = require 'lodash'

Router.use allowedWebsites
Router.use bodyParser.urlencoded
    extended: false

Router.post '/', (req, res, next) ->
    recipient = _.filter Websites, (w) ->
        return new RegExp("https?:\/\/.*#{w.domain}").test(req.headers.origin)
    recipient = recipient[0].email

    message = "Έχετε νέο μύνημα απο την ιστοσελίδα σας:\n"

    _.each _.keys(req.body), (key) ->
        message = message + "#{key}: #{req.body[key]}\n" unless req.body[key] == ""


    Mailjet.post('send')
        .request
            'FromEmail': process.env['MJ_FROM_EMAIL'],
            'FromName': process.env['MJ_FROM_NAME'],
            'Subject': "Έχετε νέο μύνημα απο την ιστοσελίδα σας",
            'Text-part': message,
            'Recipients': [
                'Email': recipient
            ]

        .on 'success', (mjRes, body) ->
            res.send('sent')

        .on 'error', (err, mjRes) ->
            res.status(400).send(err)

module.exports = Router