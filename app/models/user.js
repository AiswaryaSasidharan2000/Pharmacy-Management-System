const Sequelize = require("sequelize");
const db = require("../models/db");

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = User;
