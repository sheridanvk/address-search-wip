const assert = require("assert");
const app = require("../src/index");

describe("Address endpoint", function () {
  describe("GET /addresses", function () {
    it("should return all addresses for a provided postcode", function () {
      const response = await app.get('/addresses?postcode=N16+6PS');
      assert.strictEqual(response.body.data.addresses.length, 7);
    });
  });
});
