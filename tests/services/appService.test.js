const assert = require("assert");
const { FakeLinkRepository, FakeNanoid } = require("../fakers");
const AppService = require("../../services/appService");

const fakeLinkRepository = new FakeLinkRepository();
const appService = new AppService(fakeLinkRepository, FakeNanoid);

describe("AppService", () => {
	describe("validateUrl", () => {
		it("should return true. URL is valid", () => {
			const url = "https://www.example.com";
			const response = appService.validateURL(url);
			assert.strictEqual(true, response);
		});

		it("should return false. URL is invalid", () => {
			const url = "hippo://fakeUrl .com";
			const response = appService.validateURL(url);
			assert.strictEqual(false, response);
		});
	});

	describe("getUniquePath", () => {
		it("should return a unique shortId", async () => {
			const response = await appService.getUniquePath();
			assert.strictEqual("string", typeof response);
		});

		it("should confirm shortid is be of length 6", async () => {
			const response = await appService.getUniquePath();
			assert.strictEqual(6, response.length);
		});

		it("should throw error, couldn't generate unique id", async () => {});
	});

	describe("getOriginalUrl", () => {
		it("should throw error, page not found", async () => {
			const shortid = "a-long-invalid-url";
			await appService.getOriginalUrl(shortid).catch((err) => {
				assert.strictEqual("Page not found", err.message);
			});
		});
		it("should throw error, page not found", async () => {
			const shortid = "abcdef";
			await appService.getOriginalUrl(shortid).catch((err) => {
				assert.strictEqual("Page not found", err.message);
			});
		});

		it("should return original url", async () => {
			const fakeData = {
				originalUrl: "https://www.example.com",
				shortid: FakeNanoid(6),
			};
			const data = await fakeLinkRepository.create(
				fakeData.originalUrl,
				fakeData.shortid
			);
			const response = await appService.getOriginalUrl(data.shortid);
			assert.strictEqual(fakeData.originalUrl, response);
		});
	});

	describe("shortenURL", () => {
		it("should return shortened data", async () => {
			const originalUrl = "https://www.example.com";
			const domain = "https://www.app-testing.com";
			const res = await appService.shortenURL(originalUrl, domain);
			assert.strictEqual(res.host, domain);
			assert.strictEqual(typeof res.shortUrl, "string");
			assert.strictEqual(typeof res.path, "string");
		});
	});
});
