const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const dotenv = require("dotenv");

const nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "development" || nodeEnv === "test") {
	dotenv.config({ path: `./config/${nodeEnv}.env` });
}

const schema = require("./schema");
const AppService = require("./services/appService");
require("./db");

const app = express();

app.use(
	"/graphiql",
	expressGraphQL({
		schema: schema,
		graphiql: process.env.NODE_ENV !== "production",
	})
);

app.use(async (req, res, next) => {
	try {
		const originalUrl = await AppService.getOriginalUrl(req.url);
		res.redirect(originalUrl);
	} catch (error) {
		res.send({ message: error.message });
	}
});

module.exports = app;
