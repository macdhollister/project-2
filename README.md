# skill.it

## Quick Start

1. Clone the repository

```
git clone git@github.com:macdhollister/skill.it.git
cd skill.it
```

2. Install dependencies

```
npm install
```

3. Run `schema.sql`

4. Edit `knexfile.js` with database configs

5. Run migration and seeding

```
npm install knex -g
knex migrate:latest
knex seed:run
```

6. Launch skill.it

```
node server
```