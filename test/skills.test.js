const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const db = require("../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe("GET /api/skills", () => {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({ force: true });
    });

    it("should find all skills", done => {
        // Add some examples to the db to test with
        db.Skill.bulkCreate([
            { name: "drums" },
            { name: "cello" },
            { name: "swimming" },
            { name: "software development" }
        ]).then(() => {
        // Request the route that returns all examples
            request.get("/api/skills").end((err, res) => {
                console.log("begin first");
                const responseStatus = res.status;
                const responseBody = res.body;

                // Run assertions on the response

                expect(err).to.be.null;

                expect(responseStatus).to.equal(200);

                expect(responseBody)
                    .to.be.an("array")
                    .that.has.lengthOf(4);

                expect(responseBody[0])
                    .to.be.an("object");
                // .that.includes({  });

                expect(responseBody[1])
                    .to.be.an("object");
                // .that.includes({ text: "Second Example", description: "Second Description" });

                console.log("end first");
                // The `done` function is used to end any asynchronous tests
                done();
            });
        });
    });
});
