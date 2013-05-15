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

LeagueSchema.statics = {

  /**
   * Find team by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('organization')
      .populate('teams')
      .exec(cb)
  },

  /**
   * List teams
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('organization')
      .populate('teams')
      .sort({'createdAt': -1}) // sort by date
      .exec(cb)
  }

}

mongoose.model('League', LeagueSchema)