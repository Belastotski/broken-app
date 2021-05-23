const router = require('express').Router();
const {Game} = require('../db');

router.get('/all', (req, res) => {
    Game.findAll({ where: { owner_id: req.user.dataValues.id } })
        .then(
            function findSuccess(games) {
                if (games.length) {
                    res.status(200).json({
                        games,
                        message: "Data fetched."
                    })
                } else {
                    res.status(204).json({
                        message: "Data not found."
                    })
                }
            },

            function findFail() {
                res.status(500).json({
                    message: "Data not found"
                })
            }
        )
})

router.get('/:id', (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.dataValues.id } })
        .then(
            function findSuccess(game) {
                if (game) {
                    res.status(200).json({
                        game,
                        message: "Data fetched."
                    })
                } else {
                    res.status(204).json({
                        message: "Data not found."
                    })
                }
            },

            function findFail(err) {
                res.status(500).json({
                    message: "Data not found."
                })
            }
        )
})

router.post('/create', (req, res) => {
    Game.create({
        ...req.body,
        owner_id: req.user.dataValues.id
    })
        .then(
            function createSuccess(game) {
                res.status(200).json({
                    game,
                    message: "Game created."
                })
            },

            function createFail(err) {
                res.status(500).send(err.message)
            }
        )
})

router.put('/update/:id', (req, res) => {
    Game.update({
        ...req.body
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.user.dataValues.id
            }
        })
        .then(
            async function updateSuccess(success) {
                if (+success) {
                    res.status(200).json(
                        {
                            game: await Game.findOne({where: {id: req.params.id}}),
                            message: "Successfully updated."
                        }
                    )
                } else {
                    res.status(204).json( {
                        message: "Not found data"
                    })
                }
            },

            function updateFail(err) {
                res.status(500).json({
                    message: err.message
                })
            }

        )
})

router.delete('/remove/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.dataValues.id
        }
    })
    .then(
        function deleteSuccess(success) {
            res.status(!success ? 204 : 200).json(
            {
                message: !success ? "Not found data" : "Successfully deleted"
            })
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})

module.exports = router;
