const express = require('express');
const router = express.Router();
const eventService = require('../services/event');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    var userId = req.user.subs
    eventService.create(userId, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    var userId = req.user.sub;
    eventService.getAll(userId)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    var userId = req.user.sub;
    var eventId = req.params.id;
    eventService.getById(userId, eventId)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    var userId = req.user.sub;
    var eventId = req.params.id;
    eventService.update(userId, eventId, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    var userId = req.user.sub;
    var eventId = req.params.id;
    eventService.delete(userId, eventId)
        .then(() => res.json({}))
        .catch(err => next(err));
}