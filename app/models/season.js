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
* Season Schema
*/

var SeasonSchema = new Schema({
  name: {type: String, default: '', trim : true},
  league: {type: Schema.ObjectId, ref: 'League'},
  teams: [TeamSchema],
  startDate: {type: Date},
  endDate: {type: Date},
  createdAt  : {type: Date, default: Date.now}
})

mongoose.model('Season', SeasonSchema)