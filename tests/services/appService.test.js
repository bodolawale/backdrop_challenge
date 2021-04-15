const sinon = require("sinon");
const assert = require("assert");
const { nanoid } = require("nanoid");
const { FakeLinkRepository } = require("../fakers");
const AppService = require("../../services/appService");

const fakeLinkRepository = new FakeLinkRepository();
const appService = new AppService(fakeLinkRepository);

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

		let nanoidStub;
		const stubNanoidStub = () => {
			nanoidStub = sinon.stub(fakeLinkRepository, "findByShortId");
		};
		const restoreNanoidStub = () => {
			fakeLinkRepository.findByShortId.restore();
		};
		beforeEach("Stub nanoid service", stubNanoidStub);
		afterEach("Restore nanoid service", restoreNanoidStub);

		it("should throw error, couldn't generate unique id", async () => {
			nanoidStub.returns("same-id");
			const res = await appService.getUniquePath().catch((err) => {
				assert.strictEqual(
					"Could not generate a unique id. Try again later",
					err.message
				);
			});
			assert.strictEqual(res, undefined);
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
	});

	describe("getOriginalUrl", () => {
		it("should throw error, page not found", async () => {
			const shortid = "a-long-invalid-url";
			const res = await appService.getOriginalUrl(shortid).catch((err) => {
				assert.strictEqual("Page not found", err.message);
			});
			assert.strictEqual(res, undefined);
		});
		it("should throw error, page not found", async () => {
			const shortid = "abcdef";
			const res = await appService.getOriginalUrl(shortid).catch((err) => {
				assert.strictEqual("Page not found", err.message);
			});
			assert.strictEqual(res, undefined);
		});

		it("should return original url", async () => {
			const fakeData = {
				originalUrl: "https://www.example.com",
				shortid: nanoid(6),
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
		const originalUrl = "https://www.example.com";
		const domain = "https://www.app-testing.com";
		let path = "";
		it("should return shortened data", async () => {
			const res = await appService.shortenURL(originalUrl, domain);
			assert.strictEqual(res.host, domain);
			assert.strictEqual(typeof res.shortUrl, "string");
			assert.strictEqual(typeof res.path, "string");
			path = res.path;
		});
		it("should return a used path for same originalUrl", async () => {
			const res = await appService.shortenURL(originalUrl, domain);
			assert.strictEqual(res.path, path);
		});
	});
});
