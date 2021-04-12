const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const dotenv = require("dotenv");
const nanoid = require("nanoid");

const nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "development" || nodeEnv === "test") {
	dotenv.config({ path: `./config/${nodeEnv}.env` });
}

const schema = require("./schema");
const AppService = require("./services/appService");
const LinkRepository = require("./repository/linkRepository");

const linkRepository = new LinkRepository();
const appService = new AppService(linkRepository, nanoid);

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
		const originalUrl = await appService.getOriginalUrl(req.url);
		const path = originalUrl.split("/")[1];
		res.redirect(path);
	} catch (error) {
		res.send({ message: error.message });
	}
});

module.exports = app;
