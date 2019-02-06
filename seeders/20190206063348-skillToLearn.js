"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("SkillToLearn", [
            { userId: 1, skillId: 2 },
            { userId: 1, skillId: 6 },
            { userId: 2, skillId: 3 },
            { userId: 2, skillId: 7 },
            { userId: 3, skillId: 5 },
            { userId: 4, skillId: 6 },
            { userId: 5, skillId: 3 },
            { userId: 5, skillId: 5 },
            { userId: 6, skillId: 1 },
            { userId: 7, skillId: 1 },
            { userId: 7, skillId: 4 },
            { userId: 8, skillId: 4 },
            { userId: 9, skillId: 7 },
            { userId: 10, skillId: 2 }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("SkillToLearn", null, {});
    }
};
