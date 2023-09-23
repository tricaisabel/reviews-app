const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app.ts");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  try {
    await mongoose.connect(process.env.MONGO_TEST_API_KEY ?? "");
    console.log("Connected to MongoDB test db");
  } catch (error) {
    console.log(error);
  }
});

describe("GET /api/products/:id", () => {
  it("should return a product", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
    expect(res.body.companies).toBe([]);
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
