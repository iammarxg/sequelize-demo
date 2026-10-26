# Sequelize Demo

A very tiny project to demonstrate my learning of [Sequelize](https://sequelize.org/)

## Run

```bash
npm install
npm start
```

Uses SQLite, so there is no database server to set up.

## What it demonstrates

| Concept | Where in `index.js` |
|---|---|
| Connecting | `new Sequelize({ dialect: 'sqlite' })` |
| Defining models | `sequelize.define('User' / 'Post')` |
| Validation | `allowNull`, `unique`, `isEmail` |
| Associations | `User.hasMany(Post)`, `Post.belongsTo(User)` |
| Syncing tables | `sequelize.sync()` |
| Create | `User.create`, `ammar.createPost` |
| Read | `findAll`, `findOne`, `findByPk`, `Op.like`, `include` (join) |
| Update | `instance.update` |
| Delete | `User.destroy` |