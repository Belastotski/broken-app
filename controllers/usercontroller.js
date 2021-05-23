const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../db');

router.post('/signup', (req, res) => {
    User.create({
        ...req.body,
        password_hash: bcrypt.hashSync(req.body.password, 10)
    } )
        .then(
            function signupSuccess(user) {
                const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: user,
                    token: token
                })
            },
            function signupFail(err) {
                res.status(500).json( {
                    message : err.message
                })
            }
        )
})

router.post('/signin', (req, res) => {
    User.findOne({where: {user_name: req.body.user_name}}).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password_hash, function (err, matches) {
                if (matches) {
                    const token = jwt.sign({id: user.id}, 'lets_play_sum_games_man', {expiresIn: 60 * 60 * 24});
                    res.status(200).json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(401).json({message: "Passwords do not match."})
                }
            });
        } else {
            res.status(401).json({message: "User not found."})
        }

    }).catch(
        function signinFail(err) {
            res.status(500).json({
                    message: err.message
                }
            )
        })
})

module.exports = router;
