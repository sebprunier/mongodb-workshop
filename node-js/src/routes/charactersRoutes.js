'use strict';

/**
 * Class defining routes for Characters.
 *
 * @class CharactersRoutes
 * @constructor
 */
var CharactersRoutes = function (charactersService) {

    var CHARACTERS_PAGE_SIZE = 15;

    var _iAmFeelingLucky = function (req, res) {
        charactersService.findOneRandomly(function (character) {
            res.status(200).send(character);
        });
    };

    var _get = function (req, res) {
        var id = parseInt(req.param('id'), 10);
        charactersService.findById(id, function (character) {
            if (character !== null) {
                res.status(200).send(character);
            }
            else {
                res.status(404).send('Character not found !')
            }
        });
    };

    var _search = function (req, res) {
        if (req.query.name) {
            var name = req.query.name;
            var page = req.query.page ? parseInt(req.query.page, 10) : 1;
            var skip = CHARACTERS_PAGE_SIZE * (page - 1);
            charactersService.findByName(name, CHARACTERS_PAGE_SIZE, skip, function (characters) {
                res.status(200).send(characters);
            });
        }
        else {
            res.status(400).send('Search query not supported.');
        }
    };

    var _getAll = function (req, res) {
        var page = req.query.page ? parseInt(req.query.page, 10) : 1;
        var skip = CHARACTERS_PAGE_SIZE * (page - 1);
        charactersService.findAll(CHARACTERS_PAGE_SIZE, skip, function (characters) {
            res.status(200).send(characters);
        });
    };

    var _putStory = function (req, res) {
        var id = parseInt(req.param('id'), 10);
        var story = req.body;
        story.modified = new Date();
        charactersService.putStory(id, story, function (result) {
            res.status(200).send(result);
        });
    }

    var _create = function (req, res) {
        var character = req.body;
        character.modified = new Date();
        charactersService.create(character, function (result) {
            res.status(201).send(result);
        })
    }

    return {
        iAmFeelingLucky: _iAmFeelingLucky,
        get: _get,
        search: _search,
        getAll: _getAll,
        putStory: _putStory,
        create: _create
    };

};

module.exports = CharactersRoutes;
