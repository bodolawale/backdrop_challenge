const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialectOptions: {
		ssl: true,
	},
});

sequelize
	.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err) => err);

module.exports = sequelize;
