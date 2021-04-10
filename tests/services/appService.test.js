const assert = require("assert");
const AppService = require("../../services/appService");

describe("AppService", () => {
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
});
