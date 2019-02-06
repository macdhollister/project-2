// require("dotenv").config();

module.exports = {
    development: {
        client: "mysql",
        connection: {
            database: "skillit",
            user: "root",
            password: ""
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./db/migrations",
            tableName: "knexMigrations"
        },
        seeds: {
            directory: "./db/seeds/"
        }
    },
    staging: {
        client: "mysql",
        connection: {
            database: "skillit",
            user: "root",
            password: ""
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./db/migrations",
            tableName: "knexMigrations"
        },
        seeds: {
            directory: "./db/seeds/"
        }
    },
    production: {
        client: "mysql",
        connection: {
            database: "skillit",
            user: "root",
            password: ""
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./db/migrations",
            tableName: "knexMigrations"
        },
        seeds: {
            directory: "./db/seeds/"
        }
    }
};