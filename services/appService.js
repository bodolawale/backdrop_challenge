const { nanoid } = require("nanoid");
class AppService {
	static async shortenURL(url) {
		if (!AppService.validateURL(url)) throw new Error("Invalid URL");

		const shortId = nanoid(6);
		return {
			url,
			host: "some host",
			path: shortId,
		};
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
