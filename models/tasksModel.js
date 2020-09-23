'use strict';

const db = require('./conn');

class Task {
    constructor(id, task_name, user_id, is_done) {
        this.id = id;
        this.task_name = task_name;
        this.user_id = user_id;
        this.is_done = is_done;
    }

    static async getItems(user_id) {
        try {
            const response = await db.any(`SELECT * FROM tasks WHERE user_id = $1 AND is_done = false;`, [user_id]);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }

    static async getDoneItems(user_id) {
        try {
            const response = await db.any(`SELECT * FROM tasks WHERE user_id = $1 AND is_done = true;`, [user_id]);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }

    static async addItem(task_name, user_id) {
        try {
            const response = await db.one('INSERT INTO tasks (task_name, user_id, is_done) VALUES ($1, $2, $3);', [task_name, user_id, false]);
            console.log(response);
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }

    static async updateItems(id) {
        try {
            const response = await db.any(`UPDATE tasks SET is_done = true WHERE id = ${id}`)
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
}

module.exports = Task;