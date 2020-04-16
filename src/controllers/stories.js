require('rootpath')();

const express = require('express');
const router = express.Router();
const storyService = require('src/services/story');

function create(req, res, next) {
    const userId = req.user.sub;
    storyService.create(userId, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function getAll(req, res, next) {
    const userId = req.user.sub;
    storyService.getAll(userId)
        .then(users => users ? res.json(users) : res.sendStatus(404))
        .catch(err => next(err))
}

function getById(req, res, next) {
    const userId = req.user.sub;
    const storyId = req.params.id;
    storyService.getById(userId, storyId)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

function update(req, res, next) {
    const userId = req.user.sub;
    const storyId = req.params.id;
    storyService.update(userId, storyId, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    const userId = req.user.sub;
    const storyId = req.params.id;
    storyService.delete(userId, storyId)
        .then(() => res.json({}))
        .catch(err => next(err))
}

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;
