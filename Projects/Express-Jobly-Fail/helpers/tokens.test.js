const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

console.log("SECRET_KEY: ", SECRET_KEY);

describe("createToken", function () {
  test("works: not admin", function () {
    const token = createToken({ username: "test", isAdmin: false }); // Corrected property name
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: false, // Corrected property name
    });
  });

  test("works: admin", function () {
    const token = createToken({ username: "test", isAdmin: true }); // Corrected property name
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: true, // Corrected property name
    });
  });

  test("works: default no admin", function () {
    // Given the security risk if this didn't work, checking this specifically
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: false, // Corrected property name
    });
  });
});
