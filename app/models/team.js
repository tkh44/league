/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , LeagueSchema = require('./league.js')


/**
 * Team Schema
 */

var TeamSchema = new Schema({
  name: {type : String, default : 'Team '},
  leagues: [LeagueSchema]
})

TeamSchema.statics = {

  /**
   * Find team by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('leagues')
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
      .populate('leagues')
      .sort({'createdAt': -1}) // sort by date
      .exec(cb)
  }

}

mongoose.model('Team', TeamSchema)