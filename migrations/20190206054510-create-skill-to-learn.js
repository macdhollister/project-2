"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("SkillToLearn", {
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "User",
                    key: "id"
                }
            },
            skillId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Skill",
                    key: "id"
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        }).then(() => {
            queryInterface.addConstraint("SkillToLearn", ["userId", "skillId"], {
                type: "primary key",
                name: "skilltolearn_pkey"
            });
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("SkillToLearn");
    }
};