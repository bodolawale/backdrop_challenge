const Link = require("../model/link");

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

	async findByOriginalUrl(originalUrl) {
		return Link.findOne({
			where: {
				originalUrl,
			},
		});
	}
}

module.exports = LinkRepository;
