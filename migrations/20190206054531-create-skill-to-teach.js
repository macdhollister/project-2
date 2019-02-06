"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("SkillToTeach", {
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
            queryInterface.addConstraint("SkillToTeach", ["userId", "skillId"], {
                type: "primary key",
                name: "skilltoteach_pkey"
            });
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("SkillToTeach");
    }
};