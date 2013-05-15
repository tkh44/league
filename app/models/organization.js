/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema
  , TeamSchema = require('./team.js') // Probably don't need this
  , LeagueSchema = require('./league.js')


/**
* Organization Schema
*/

var OrganizationSchema = new Schema({
  name: {type : String, 'default' : '', trim : true},
  owner: {type : Schema.ObjectId, ref : 'User'},
  leagues: [LeagueSchema],
  createdAt  : {type : Date, 'default' : Date.now}
})

mongoose.model('Organization', OrganizationSchema)