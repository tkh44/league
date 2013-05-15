/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema
  , TeamSchema = require('./team.js')


/**
* League Schema
*/

var LeagueSchema = new Schema({
  name: {type : String, default : '', trim : true},
  organization: {type: Schema.ObjectId, ref: 'Organization'},
  teams: [TeamSchema],
  createdAt  : {type : Date, default : Date.now}
})

mongoose.model('League', LeagueSchema)