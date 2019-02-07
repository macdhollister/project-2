"use strict";

const bcrypt = require("bcrypt-nodejs");

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
            unique: true,
            validate: {
                isEmail: true
            }
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

    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    User.associate = function (models) {
        User.hasMany(models.SkillToLearn, {
            onDelete: "cascade",
            foreignKey: "userId",
            sourceKey: "id"
        });

        User.hasMany(models.SkillToTeach, {
            onDelete: "cascade",
            foreignKey: "userId",
            sourceKey: "id"
        });
    };
    
    return User;
};