class AppService {
	// Dependency injection for easy testing!
	constructor(linkRepository, nanoid) {
		this.linkRepository = linkRepository;
		this.nanoid = nanoid;
	}

	async shortenURL(originalUrl, req) {
		if (!this.validateURL(originalUrl)) throw new Error("Invalid URL");

		const shortid = await this.getUniquePath();

		const domain = req.protocol + "://" + req.get("host");
		const shortUrl = `${domain}/${shortid}`;

		await this.linkRepository.create(originalUrl, shortid);

		return {
			shortUrl,
			host: domain,
			path: shortid,
		};
	}

	async getUniquePath() {
		let shortid = this.nanoid(6);
		let exists = null;
		// Making sure the shortid is not already in the database.
		for (let i = 0; i < 3; i++) {
			exists = await this.linkRepository.findByShortId(shortid);
			if (!exists) return shortid;
			shortid = this.nanoid(6);
		}
		// This most likely won't happen given the scope of the project.
		if (exists)
			throw new Error("Could not generate a unique id. Try again later");

		return shortid;
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
