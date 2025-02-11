/**
 * @typedef Login
 * @property {string} user.required - Username
 * @property {string} password.required - Password
 */
/**
 * @typedef Registry
 * @property {string} name - User's name
 * @property {string} user.required - Username
 * @property {string} password.required - Password
 */

 const Schema = require('mongoose');
 const connect = Schema.connect(
     `${(process.env.MONGO_URL || 'mongodb://localhost:27017/mydb_development' )}_${(process.env.NODE_ENV || 'development')}`,
     {
         serverSelectionTimeoutMS: (!process.env.NODE_ENV) ? 1000 : 30000
     }
 );
 
 exports.Post = require('./Post.js')
 exports.Comment = require('./Comments.js')
 exports.Profile = require('./Profile.js')
 exports.User = require('./User.js')
 
 Schema.connection.on('error', () => {
     console.error(`Mongo not connected!`);
 });
 
 Schema.connection.on('connected', () => {
     console.error(`Mongo Connected!`);
 });
 
 Schema.connection.on('disconnected', () => {
     console.error(`Mongo Disconnected!`);
 });
 
 exports.Connection = connect