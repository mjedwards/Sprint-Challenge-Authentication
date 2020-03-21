const server = require("./api/server.js");
const supertest = require("supertest");

describe("POST /", () => {
  test("returns 201 OK", () => {
    let res = supertest(server)
      .post("/register")
      .send({ username: "Ron", password: "testing2" })
      .expect(res.status)
      .toBe(201);
  });
  test("checks if there is same email", () => {
    let res = supertest(server)
      .post("/register")
      .send({ username: "Ron", password: "testing2" });
    expect(res.status).toBe(500);
  });
});
