"use strict";

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert("User", [
            {
                username: "tiffanywang",
                email: "tiffany.wang@gmail.com",
                password: "L1@wbst",
                description: ""
            },
            {
                username: "josemendoza",
                email: "jose.mendoza@yahoo.com",
                password: "t1ju4n@",
                description: ""
            },
            {
                username: "kenjikaneko",
                email: "kenji.kaneko@outlook.com",
                password: "k4n3k0415",
                description: ""
            },
            {
                username: "anushreechopra",
                email: "anushree.chopra@yahoo.com",
                password: "19ac96!!",
                description: ""
            },
            {
                username: "erinstark",
                email: "erin.stark@gmail.com",
                password: "j0n15m1n3",
                description: ""
            },
            {
                username: "andreidimov",
                email: "andrei.dimov@gmail.com",
                password: "r3dp3nd@",
                description: ""
            },
            {
                username: "audreyan",
                email: "audrey.an@gmail.com",
                password: "06dr3y1995",
                description: ""
            },
            {
                username: "mattrice",
                email: "matt.rice@outlook.com",
                password: "Z1pL1n1ng!!",
                description: ""
            },
            {
                username: "juliaosadzinski",
                email: "julia.osadzinski@outlook.com",
                password: "0mgSO4wsum",
                description: ""
            },
            {
                username: "drewkane",
                email: "drew.kane@yahoo.com",
                password: "z1lch2S@Y",
                description: ""
            }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete("User", null, {});
    }
};
