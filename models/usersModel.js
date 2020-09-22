'use strict';

const db = require('./conn');
const bcrypt = require('bcryptjs');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async save() {
        try {
            const response = await db.one(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`, [this.name, this.email, this.password]);
            console.log("User was created with ID:", response.id);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }

    async login() {
        try {
            const response = await db.one(`SELECT id, name, email, password FROM reviewers WHERE email = $1;`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            if (!!isValid) {
                const {
                    first_name,
                    id
                } = response;
                return {
                    isValid,
                    name,
                    user_id: id
                };
            } else {
                return {
                    isValid
                };
            }
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
}

module.exports = User;