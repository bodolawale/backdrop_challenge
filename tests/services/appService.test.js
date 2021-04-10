const assert = require("assert");
// const { beforeAll, afterAll } = require("mocha");
const AppService = require("../../services/appService");
const Link = require("../../models/link");

describe("AppService", () => {
	const dbData = [];
	const clearDb = (done) => {
		dbData.splice(0);
		Link.destroy({
			where: {},
		})
			.then(() => done())
			.catch(done);
	};

	const setup = async () => {
		try {
			console.log("setting up");
			const linkData = {
				shortid: "qwerty",
				originalUrl: "https://www.example.com",
			};
			const link = await Link.create(linkData);
			dbData.push(link);
		} catch (error) {
			throw new Error(error);
		}
	};

	before("Setup database", setup);
	after("Clear database", clearDb);

	describe("validateUrl", () => {
		it("should return true. URL is valid", () => {
			const url = "https://www.example.com";
			const response = AppService.validateURL(url);
			assert.strictEqual(true, response);
		});

		it("should return false. URL is invalid", () => {
			const url = "hippo://fakeUrl .com";
			const response = AppService.validateURL(url);
			assert.strictEqual(false, response);
		});
	});

	describe("getUniquePath", () => {
		it("should return a unique shortId", async () => {
			const response = await AppService.getUniquePath();
			assert.strictEqual("string", typeof response);
		});

		it("shortId should be of length 6", async () => {
			const response = await AppService.getUniquePath();
			assert.strictEqual(6, response.length);
		});
	});

	describe("getOriginalUrl", () => {
		it("throw error, page not found", async () => {
			const shortid = "a-long-invalid-url";
			await AppService.getOriginalUrl(shortid).catch((err) => {
				assert.strictEqual("Page not found", err.message);
			});
		});
		it("throw error, page not found", async () => {
			const shortid = "abcdef";
			await AppService.getOriginalUrl(shortid).catch((err) => {
				assert.strictEqual("Page not found", err.message);
			});
		});

		it("should return original url", async () => {
			const shortid = dbData[0].shortid;
			const response = await AppService.getOriginalUrl(shortid);
			assert.strictEqual(dbData[0].originalUrl, response);
		});
	});
});
