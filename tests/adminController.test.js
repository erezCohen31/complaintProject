import { test } from "node:test";
import assert from "node:assert/strict";
import { AdminController } from "../controllers/adminController.js";
import Complaint from "../models/complaint.model.js";

// Mock environment variable
process.env.ADMIN_PASSWORD = "admin123";

// Tests for AdminController
test("AdminController - login", async (t) => {
  await t.test("should redirect to /admin/panel with correct password", () => {
    const req = {
      body: {
        password: "admin123",
      },
    };

    let redirected = false;
    const res = {
      redirect: (url) => {
        redirected = true;
        assert.strictEqual(
          url,
          "/admin/panel",
          "Should redirect to /admin/panel"
        );
      },
    };

    AdminController.login(req, res);
    assert.strictEqual(redirected, true, "Redirect should be called");
  });

  await t.test("should return a 403 error with incorrect password", () => {
    const req = {
      body: {
        password: "wrongPassword",
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

    AdminController.login(req, res);

    assert.strictEqual(
      res.statusCode,
      403,
      "Should return status 403 for incorrect password"
    );
    assert.strictEqual(
      res.message,
      "Incorrect password",
      "Should return appropriate error message"
    );
  });
});

test("AdminController - showPanel", (t) => {
  t.test("should send the admin-panel.html file", (t) => {
    let fileSent = false;
    const res = {
      sendFile: (filePath) => {
        fileSent = true;
        assert(
          filePath.includes("admin-panel.html"),
          "Should send the admin-panel.html file"
        );
      },
    };

    AdminController.showPanel({}, res);
    assert(fileSent, "sendFile should be called");
  });
});

test("AdminController - getComplaints", async (t) => {
  await t.test(
    "should return the list of complaints sorted by date",
    async (t) => {
      // Mock the Mongoose find function
      const originalFind = Complaint.find;
      Complaint.find = () => ({
        sort: () =>
          Promise.resolve([
            { category: "Food", message: "Test 1" },
            { category: "Equipment", message: "Test 2" },
          ]),
      });

      const res = {
        json: (data) => {
          assert(Array.isArray(data), "Should return an array");
          assert.strictEqual(data.length, 2, "Should return 2 complaints");
        },
        status(code) {
          this.statusCode = code;
          return this;
        },
      };

      await AdminController.getComplaints({}, res);

      // Restore original function
      Complaint.find = originalFind;
    }
  );

  await t.test("should handle database errors gracefully", async (t) => {
    // Mock the find function to simulate an error
    const originalFind = Complaint.find;
    Complaint.find = () => ({
      sort: () => Promise.reject(new Error("Database error")),
    });

    let errorLogged = false;
    const originalConsoleError = console.error;
    console.error = () => {
      errorLogged = true;
    };

    const res = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.data = data;
      },
    };

    await AdminController.getComplaints({}, res);

    assert.strictEqual(
      res.statusCode,
      500,
      "Should return status 500 on error"
    );
    assert.strictEqual(
      res.data.message,
      "Server error",
      "Should return appropriate error message"
    );
    assert.strictEqual(
      errorLogged,
      true,
      "Error should be logged to the console"
    );

    // Restore original functions
    Complaint.find = originalFind;
    console.error = originalConsoleError;
  });
});
