const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		dialect: "postgres",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		query: { raw: true },
	}
);

sequelize
	.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err) => err);

module.exports = sequelize;
