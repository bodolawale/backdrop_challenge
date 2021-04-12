const Link = require("../dto/link");

class LinkRepository {
	async create(originalUrl, shortid) {
		return Link.create({
			originalUrl,
			shortid,
		});
	}

	async findByShortId(shortid) {
		return Link.findOne({
			where: {
				shortid,
			},
		});
	}
}

module.exports = LinkRepository;
