const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema");
const AppService = require("./services/appService");

const app = express();

const port = process.env.PORT || 3231;

app.use(
	"/graphiql",
	expressGraphQL({
		schema: schema,
		graphiql: true,
	})
);

app.use(async (req, res, next) => {
	const fullUrl = await AppService.getFullUrl(req.url);
	res.redirect(fullUrl);
});

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
