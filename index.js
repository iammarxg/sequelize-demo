const { Sequelize, DataTypes, Op } = require('sequelize');

// 1. Connect (SQLite file, so no database server needed)
const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'db.sqlite', logging: false });

// 2. Define models
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
});

const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  body: DataTypes.TEXT,
});

// 3. Associations (one user has many posts)
User.hasMany(Post);
Post.belongsTo(User);

async function main() {
  // 4. Sync: creates the tables (force: true resets them on every run)
  await sequelize.sync({ force: true });

  // CREATE
  const ammar = await User.create({ name: 'Ammar', email: 'ammar@example.com' });
  await User.create({ name: 'Sara', email: 'sara@example.com' });
  await Post.create({ title: 'Hello Sequelize', body: 'My first post', UserId: ammar.id });
  await ammar.createPost({ title: 'Second post', body: 'Using an association helper' });

  // READ
  const all = await User.findAll();
  console.log('All users:', all.map(u => u.name));

  const found = await User.findOne({ where: { name: { [Op.like]: 'Am%' } } });
  console.log('Found:', found.toJSON());

  // READ with JOIN (include)
  const withPosts = await User.findByPk(ammar.id, { include: Post });
  console.log(`${withPosts.name} has ${withPosts.Posts.length} posts:`, withPosts.Posts.map(p => p.title));

  // UPDATE
  await found.update({ name: 'Ammar K.' });
  console.log('Updated name:', (await User.findByPk(ammar.id)).name);

  // DELETE
  await User.destroy({ where: { email: 'sara@example.com' } });
  console.log('Users left:', await User.count());

  // Validation demo
  try {
    await User.create({ name: 'Bad', email: 'not-an-email' });
  } catch (e) {
    console.log('Validation error:', e.errors[0].message);
  }

  await sequelize.close();
}

main();