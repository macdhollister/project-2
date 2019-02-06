"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("Skill", [
            { name: "arts" },
            { name: "cooking" },
            { name: "dance" },
            { name: "foreign language" },
            { name: "music" },
            { name: "software development" },
            { name: "sports" }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("Skill", null, {});
    }
};
