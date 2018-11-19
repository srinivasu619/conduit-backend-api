const {
	Router
} = require('express')
const authorization = require('../../../middlewares/extractToken');
const ArticleController = require('../../../controllers/articles');
const TagController = require('../../../controllers/tags');
const ProfileFactory = require('../../../dto/profileDTO');
const ArticleFactory = require('../../../dto/articleDTO');
const FeedController = require('../../../controllers/feed');
const processArticle = require('../../../util/processArticle').processArticle;

const route = Router()

route.use('/feed', require('./feed'));
route.use('/', require('./slug'));


route.get('/', authorization.optional, async (req, res) => {
	const user = req.user;
	const author = req.query.author;
	const tag = req.query.tag;
	const favoritedBy = req.query.favorited;
	const limit = req.query.limit;
	const offset = req.query.offset;

	const articleResult = await FeedController.getFeed(author, tag, favoritedBy, offset, limit);
	const articles = [];
	for(let article of articleResult.rows){
        const result = await processArticle(article,user);
        articles.push(result);
    }
	return res.status(200).json({
		articlesCount: articleResult.count,
		articles: articles
	});

});

route.post('/', authorization.required, async (req, res) => {
	const user = req.user;
	const article = req.body.article;
	const title = article.title;
	const description = article.description;
	const body = article.body;
	const tagList = article.tagList;
	const newArticle = await ArticleController.createArticle(title, description, body, user.id);
	for (let tagName of tagList) {
		const tag = await TagController.create(tagName);
		await newArticle.addTag(tag[0]);
	}
	const author = ProfileFactory.create(user);
	const response = ArticleFactory.create(newArticle, author, tagList, 0, false);
	res.status(201).json({
		article: response
	});
});


module.exports = route