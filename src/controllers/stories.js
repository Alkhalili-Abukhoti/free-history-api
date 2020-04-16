require('rootpath')();

const express = require('express');
const router = express.Router();
const storyService = require('src/services/story');

function create(req, res, next) {
    var userId = req.user.subs
    storyService.create(userId, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    var userId = req.user.sub;
    storyService.getAll(userId)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    var userId = req.user.sub;
    var eventId = req.params.id;
    storyService.getById(userId, eventId)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    var userId = req.user.sub;
    var eventId = req.params.id;
    storyService.update(userId, eventId, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    var userId = req.user.sub;
    var eventId = req.params.id;
    storyService.delete(userId, eventId)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;