require('dotenv/config');
const bcryptjs = require("bcryptjs");

const admin = {
    "username": bcryptjs.hashSync(process.env.ADMIN_USER),
    "password":bcryptjs.hashSync(process.env.ADMIN_PW),
}

module.exports = admin;