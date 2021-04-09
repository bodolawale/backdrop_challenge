const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");

const app = express();

const port = process.env.PORT || 3231;

app.use(
	"/graphiql",
	expressGraphQL({
		schema: schema,
		graphiql: true,
	})
);

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
