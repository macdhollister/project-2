"use strict";

module.exports = (sequelize, DataTypes) => {
    const SkillToTeach = sequelize.define("SkillToTeach", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        skillId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    }, {
        freezeTableName: true
    });

    SkillToTeach.associate = function (models) {
        SkillToTeach.belongsTo(models.User, {
            foreignKey: "userId",
            targetKey: "id"
        });

        SkillToTeach.belongsTo(models.Skill, {
            foreignKey: "skillId",
            targetKey: "id"
        });
    };

    return SkillToTeach;
};