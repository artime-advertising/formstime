Mailjet = require 'node-mailjet'

module.exports = Mailjet
  .connect(process.env['MJ_APIKEY_PUBLIC'], process.env['MJ_APIKEY_SECRET'])
