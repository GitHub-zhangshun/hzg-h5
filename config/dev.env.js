'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PRIVATE_KEY:'"a5834b3fc9780d1a1f35015979f47552"',
  MID:'"6935d938-45bb-4a11-997d-07c90e19874c"',
  BASE_API: '"/api"',
  domain:'"http://10.10.11.34:9001"'
})
