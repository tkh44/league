/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , async = require('async')
  , Team = mongoose.model('Team')
  , _ = require('underscore')

/**
 * Find team by id
 */
exports.team = function(req, res, next, id){
  Team.load(id, function (err, team) {
    if (err) return next(err)
    if (!team) return next(new Error('Failed to load team ' + id))
    req.team = team
    next()
  })
}

/**
 * View an team
 */
exports.show = function(req, res){
  res.render('teams/show', {
    title: req.team.title,
    team: req.team
  })
}

/**
 * New team
 */
exports.new = function(req, res){
  res.render('teams/new', {
    title: 'New Team',
    team: new Team({})
  })
}

/**
 * Create a team
 */
exports.create = function (req, res) {
  var team = new Team(req.body)
  team.user = req.user
  
  team.save( function(err) {
    if (err) {
      res.render('teams/new', {
        title: 'New Team',
        team: team,
        errors: err.errors
      })
    }
    else {
      res.redirect('teams')
    }
  });
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



