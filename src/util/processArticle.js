const ProfileFactory = require('../dto/profileDTO');
const ArticleFactory = require('../dto/articleDTO');

async function processArticle(article, user) {
	let tags = await article.getTags();
	let author = article.author;
	const likeCount = await article.countLikes();
	let favorited = false;
	let following = false;
	if (user) {
		favorited = await article.hasLike(user);
	}
	author = ProfileFactory.create(author, following);
	tags = tags.map(tag => tag.name);

	const response = ArticleFactory.create(article, author, tags, likeCount, favorited);
	return response;
}

module.exports.processArticle = processArticle; 