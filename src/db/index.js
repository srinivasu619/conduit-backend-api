const {
  db
} = require('./setupDB')

const User = require('./models/users')
const Article = require('./models/articles');
const Tag = require('./models/tags');
const Credential = require('./models/credential');
const Comment = require('./models/comments');
const Like = db.define('likes', {});
const ArticleTag = db.define('articles_tags');

User.hasOne(Credential);
/**
 * Association between Article and Users
 */
Article.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author'
});
User.hasMany(Article, {
  foreignKey: 'authorId'
});

/**
 * Association between Article and Tags.
 */
// Article.belongsToMany(Tag, {
//   through: 'articles_tags'
// });
// Tag.belongsToMany(Article, {
//   through: 'articles_tags'
// });

Article.belongsToMany(Tag, {
  through: ArticleTag
});
Tag.belongsToMany(Article, {
  through: ArticleTag
});

/**
 * Association representing Likes between Article and Users.
 */
User.belongsToMany(Article, {
  through: Like,
  as: 'Likes'
});
Article.belongsToMany(User, {
  through: Like,
  as: 'Likes'
});

/**
 * Asssociation between Article and Comment.
 */
Article.hasMany(Comment);
/**
 * Association between Comment and User.
 */
Comment.belongsTo(User);
Comment.belongsTo(Article);

User.belongsToMany(User, {
  through: 'followee_follower',
  as: 'followers'
});

module.exports = {
  db,
  User,
  Article,
  Tag,
  Credential,
  Comment,
  ArticleTag
}