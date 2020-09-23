'use strict';

const express = require('express');
const router = express.Router();
const TasksModel = require('../models/tasksModel');

router.get('/', async (req, res) => {
    const taskData = await TasksModel.getItems(req.session.user_id);
    const taskDoneData = await TasksModel.getDoneItems(req.session.user_id);
    console.log(taskDoneData);
    res.render('template', {
        locals: {
            title: 'Tasks',
            data: taskData,
            doneData: taskDoneData,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-tasks'
        }
    })
});

router.post('/', async (req, res) => {
    const {
        task_name,
    } = req.body;
    const response = TasksModel.addItem(task_name, req.session.user_id);
    res.redirect('/tasks');
})

router.post('/done', async (req, res) => {
    TasksModel.updateItems(req.body.id)
    res.redirect('/tasks');
})


module.exports = router;