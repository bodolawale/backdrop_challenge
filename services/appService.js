const { nanoid } = require("nanoid");

const Link = require("../models/link");
class AppService {
	static async shortenURL(originalUrl, req) {
		if (!AppService.validateURL(originalUrl)) throw new Error("Invalid URL");

		const shortid = await this.getUniquePath();

		const domain = req.protocol + "://" + req.get("host");
		const shortUrl = `${domain}/${shortid}`;

		await await Link.create({
			originalUrl,
			shortid,
		});

		return {
			shortUrl,
			host: domain,
			path: shortid,
		};
	}

	static async getUniquePath() {
		let shortid = nanoid(6);
		let exists = null;
		// Making sure the shortid is not already in the database.
		for (let i = 0; i < 3; i++) {
			exists = await Link.findOne({
				where: {
					shortid,
				},
			});
			if (!exists) return;
			shortid = nanoid(6);
		}
		// This most likely won't happen given the scope of the project.
		if (exists)
			throw new Error("Could not generate a unique id. Try again later");

		return shortid;
	}

	static async getOriginalUrl(shortUrl) {
		const path = shortUrl.split("/")[1];
		const link = await Link.findOne({
			where: {
				shortid: path,
			},
		});
		if (!link) throw new Error("Page not found");
		return link.originalUrl;
	}

	static validateURL(url) {
		try {
			new URL(url);
		} catch (e) {
			console.error(e);
			return false;
		}
		return true;
	}
}

module.exports = AppService;
