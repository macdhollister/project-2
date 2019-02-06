"use strict";

module.exports = (sequelize, DataTypes) => {
    const SkillToLearn = sequelize.define("SkillToLearn", {
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

    SkillToLearn.associate = function (models) {
        SkillToLearn.belongsTo(models.User, {
            foreignKey: "userId",
            targetKey: "id"
        });

        SkillToLearn.belongsTo(models.Skill, {
            foreignKey: "skillId",
            targetKey: "id"
        });
    };
    
    return SkillToLearn;
};