/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , Team = mongoose.model('Team')
  , _ = require('underscore')

/**
 * Find article by id
 */

exports.team = function(req, res, next, id){
  Team.load(id, function (err, article) {
    if (err) return next(err)
    if (!article) return next(new Error('Failed to load team ' + id))
    req.team = team
    next()
  })
}

/**
 * List of Teams
 */

exports.index = function(req, res){
  var options = {}

  Team.list(options, function(err, teams) {
    if (err) return res.render('500')
    Team.count().exec(function (err, count) {
      res.render('teams/index', {
        title: 'List of Teams',
        teams: teams
      })
    })
  })
}



