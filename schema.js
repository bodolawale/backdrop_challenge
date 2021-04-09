const {
	GraphQLSchema,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
} = require("graphql");

const AppService = require("./services/appService");

const DataType = new GraphQLObjectType({
	name: "Data",
	fields: () => ({
		shortUrl: { type: GraphQLString },
		host: { type: GraphQLString },
		path: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootTypeQuery",
	fields: {
		data: {
			type: DataType,
			args: {
				shortenURL: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args, content) {
				return AppService.shortenURL(args.shortenURL, content);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
