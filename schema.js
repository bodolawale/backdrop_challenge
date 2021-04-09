const { GraphQLSchema, GraphQLString, GraphQLObjectType } = require("graphql");

const AppService = require("./services/appService");

const DataType = new GraphQLObjectType({
	name: "Data",
	fields: () => ({
		url: { type: GraphQLString },
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
				shortenURL: { type: GraphQLString },
			},
			resolve(parent, args) {
				return AppService.shortenURL(args.shortenURL);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
