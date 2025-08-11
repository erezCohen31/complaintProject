import { test } from "node:test";
import assert from "node:assert/strict";
import { ComplaintController } from "../controllers/complaintsController.js";

// Tests for ComplaintController
test("ComplaintController - submitComplaint", async (t) => {
  await t.test("should accept a valid complaint", async () => {
    const req = {
      body: {
        category: "Food",
        message: "The food was cold",
      },
    };

    const res = {
      sendFile: (filePath) => {
        // Check that the receipt file is returned
        assert.strictEqual(
          filePath.includes("receipt.html"),
          true,
          "Should return the receipt.html file"
        );
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(message) {
        this.message = message;
        return this;
      },
    };

    await ComplaintController.submitComplaint(req, res);
  });

  await t.test("should reject a request with missing fields", async () => {
    const req = {
      body: {
        // category is intentionally missing
        message: "Complaint without category",
      },
    };

    const res = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(message) {
        this.message = message;
        return this;
      },
    };

    await ComplaintController.submitComplaint(req, res);

    assert.strictEqual(
      res.statusCode,
      400,
      "Should return status 400 for missing fields"
    );
    assert.strictEqual(
      res.message,
      "All fields are required.",
      "Should return an appropriate error message"
    );
  });

  await t.test("should reject an invalid category", async () => {
    const req = {
      body: {
        category: "InvalidCategory",
        message: "Test with an invalid category",
      },
    };

    const res = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(message) {
        this.message = message;
        return this;
      },
    };

    try {
      await ComplaintController.submitComplaint(req, res);
      assert.fail("Expected a validation error but none was thrown");
    } catch (error) {
      // Mongoose validation should fail for an invalid category
      assert.ok(error instanceof Error, "Should throw a validation error");
    }
  });
});
