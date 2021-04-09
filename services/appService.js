class AppService {
	static async shortenURL(url) {
		return {
			url,
			host: "some host",
			path: "some path",
		};
	}
}

module.exports = AppService;
