const { nanoid } = require("nanoid");
const {
	GraphQLSchema,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
} = require("graphql");
const LinkRepository = require("./repository/linkRepository");
const AppService = require("./services/appService");

const linkRepository = new LinkRepository();
const appService = new AppService(linkRepository, nanoid);

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
				return appService.shortenURL(args.shortenURL, content);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
