const Sequelize = require("sequelize");
const sequelize = require("../db");

// Define the Link Schema
const Link = sequelize.define("link", {
	shortid: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	originalUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

Link.sync({ alter: true });

module.exports = Link;
