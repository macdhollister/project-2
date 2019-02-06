"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("SkillToTeach", [
            { userId: 1, skillId: 1 },
            { userId: 1, skillId: 4 },
            { userId: 2, skillId: 2 },
            { userId: 2, skillId: 4 },
            { userId: 3, skillId: 1 },
            { userId: 3, skillId: 3 },
            { userId: 3, skillId: 7 },
            { userId: 4, skillId: 2 },
            { userId: 4, skillId: 3 },
            { userId: 4, skillId: 4 },
            { userId: 4, skillId: 5 },
            { userId: 5, skillId: 1 },
            { userId: 5, skillId: 6 },
            { userId: 6, skillId: 3 },
            { userId: 6, skillId: 6 },
            { userId: 6, skillId: 7 },
            { userId: 7, skillId: 5 },
            { userId: 7, skillId: 6 },
            { userId: 8, skillId: 5 },
            { userId: 8, skillId: 7 },
            { userId: 9, skillId: 1 },
            { userId: 9, skillId: 2 },
            { userId: 9, skillId: 5 },
            { userId: 10, skillId: 4 },
            { userId: 10, skillId: 6 },
            { userId: 10, skillId: 7 }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("SkillToTeach", null, {});
    }
};
