const {
	Router
} = require('express')
const authorization = require('../../../middlewares/extractToken');
const ArticleController = require('../../../controllers/articles');
const TagController = require('../../../controllers/tags');
const ProfileFactory = require('../../../dto/profileDTO');
const ArticleFactory = require('../../../dto/articleDTO');

const route = Router()

route.use('/', require('./slug'))


route.get('/', (req, res) => {
	// GET GLOBAL FEED
})

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