// bring in knex
const knex = require('knex');
// import knexfile.js
const config = require('../knexfile.js')
// declare the environment
// const environment = process.env.NODE_ENV || 'development';
// export
module.exports = knex(config.development)