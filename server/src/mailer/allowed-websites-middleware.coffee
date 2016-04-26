Websites = require './available-websites'
Router = require('express').Router()
_ = require 'lodash'

Router.use (req, res, next) ->
    origin = req.headers.origin
    isAllowed = false

    _.each Websites, (website) ->
        allowed = new RegExp("https?:\/\/.*#{website.domain}").test(origin)
        isAllowed = true if allowed

    if (isAllowed)
        console.log "Access allowed for #{origin}"
        next()
    else
        console.log "Access denied for #{origin}"
        res.status(401).end()

module.exports = Router