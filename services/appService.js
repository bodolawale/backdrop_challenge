class AppService {
	static async shortenUrl(url) {
		return {
			url,
			host: "some host",
			path: "some path",
		};
	}
}

module.exports = AppService;
