const { nanoid } = require("nanoid");

const Link = require("../models/link");
class AppService {
	static async shortenURL(originalUrl, req) {
		if (!AppService.validateURL(originalUrl)) throw new Error("Invalid URL");

		const shortid = nanoid(6);
		const domain = req.protocol + "://" + req.get("host");

		const shortUrl = `${domain}/${shortid}`;

		await AppService.saveLink(originalUrl, shortid);

		return {
			shortUrl,
			host: domain,
			path: shortid,
		};
	}

	static async saveLink(originalUrl, shortid) {
		const exists = await Link.findOne({
			where: {
				shortid,
			},
		});
		if (exists) throw new Error("Short Id already exists");

		await Link.create({
			originalUrl,
			shortid,
		});
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
