const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const db = require("../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe("POST /api/skills", () => {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({ force: true });
    });

    it("should add a new skill and redirect", done => {
        // Create an object to send to the endpoint
        const reqBody = {
            skillName: "Test Skill",
        };

        // POST the request body to the server
        request
            .post("/api/skills")
            .send(reqBody)
            .redirects(0)
            .end((err, res) => {
                const responseStatus = res.status;
                // const responseBody = res.body;

                // Run assertions on the response

                expect(err).to.be.null;

                expect(responseStatus).to.equal(302);

                expect(res).to.redirectTo("/profile");

                // The `done` function is used to end any asynchronous tests
                done();
            });
    });
});
