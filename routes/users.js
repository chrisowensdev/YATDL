'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UsersModel = require('../models/usersModel');


router.get('/', async (req, res) => {
    res.redirect('/login');
})

router.get('/login', async (req, res) => {
    res.render('template', {
        locals: {
            title: 'Signup',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-login'
        }
    })
});

router.get('/signup', async (req, res) => {
    res.render('template', {
        locals: {
            title: 'Signup',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-signup'
        }
    });
})

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const userInstance = new UsersModel(null, null, email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            const {
                name,
                user_id
            } = response;
            req.session.name = name;
            req.session.user_id = user_id;
            res.redirect('/tasks');
        } else {
            res.sendStatus(401);
        }
    });
})

router.post('/signup', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new UsersModel(null, name, email, hash);

    userInstance.save().then(response => {
        if (response.id !== undefined) {
            // res.redirect('/users/login');
            res.sendStatus(200);
        } else {
            // res.redirect('/users/signup');
            res.sendStatus(400);
        }
    })
});

module.exports = router;