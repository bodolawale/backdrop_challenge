const { nanoid } = require("nanoid");
class AppService {
	// Dependency injection for easy testing!
	constructor(linkRepository) {
		this.linkRepository = linkRepository;
	}

	async shortenURL(originalUrl, domain) {
		if (!this.validateURL(originalUrl)) throw new Error("Invalid URL");

		// check id originalUrl already exists
		const exists = await this.linkRepository.findByOriginalUrl(originalUrl);
		if (exists) {
			return {
				shortUrl: `${domain}/${exists.shortid}`,
				host: domain,
				path: exists.shortid,
			};
		}

		const shortid = await this.getUniquePath();

		const shortUrl = `${domain}/${shortid}`;

		await this.linkRepository.create(originalUrl, shortid);

		return {
			shortUrl,
			host: domain,
			path: shortid,
		};
	}

	async getUniquePath(count = 0) {
		if (count > 3)
			throw new Error("Could not generate a unique id. Try again later");

		let shortid = nanoid(6);

		// Making sure the shortid is not already in the database.
		const exists = await this.linkRepository.findByShortId(shortid);

		if (!exists) return shortid;

		return this.getUniquePath((count += 1));
	}

	async getOriginalUrl(shortid) {
		// simple validation check
		if (shortid.length !== 6) throw new Error("Page not found");

		const link = await this.linkRepository.findByShortId(shortid);
		if (!link) throw new Error("Page not found");
		return link.originalUrl;
	}

	validateURL(url) {
		try {
			new URL(url);
		} catch (e) {
			return false;
		}
		return true;
	}
}

module.exports = AppService;
