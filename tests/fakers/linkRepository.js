class FakeLinkRepository {
	constructor() {
		this.id = 0;
		this.links = [];
	}
	async create(originalUrl, shortid) {
		this.id = this.id++;

		const linkData = {
			id: this.id,
			originalUrl,
			shortid,
		};
		this.links.push(linkData);
		return linkData;
	}

	async findByShortId(shortid) {
		return this.links.find((link) => link.shortid === shortid);
	}
}

module.exports = FakeLinkRepository;
