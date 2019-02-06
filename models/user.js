"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        freezeTableName: true
    });

    User.associate = function (models) {
        User.hasMany(models.SkillToLearn, {
            onDelete: "cascade"
        });

        User.hasMany(models.SkillToTeach, {
            onDelete: "cascade"
        });
    };
    
    return User;
};