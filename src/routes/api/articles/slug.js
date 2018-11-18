const {
	Router
} = require('express')
const authorization = require('../../../middlewares/extractToken');
const ArticleController = require('../../../controllers/articles');
const processArticle = require('../../../util/processArticle').processArticle;

const route = Router()

route.get('/:slug', authorization.optional, async (req, res) => {
	const user = req.user;
	const slug = req.params.slug;
	try {
		const article = await ArticleController.findBySlug(slug);
		if (article == null) {
			return res.status(404).json({
				message: 'Article Not Found'
			})
		}
		const response = await processArticle(article, user);
		return res.status(200).json({
			article: response
		})
	} catch (error) {
		return res.status(500).send(error.message);
	}
})

route.put('/:slug', authorization.required, async (req, res) => {
	const user = req.user;
	const slug = req.params.slug;
	const article = req.body.article;

	try {
		const result = await ArticleController.updateArticle(slug, article, user.id);
		if (result == null) {
			return res.status(404).json({
				error: {
					message: 'article not found'
				}
			})
		}
		const response = await processArticle(result);
		return res.status(200).json({
			article: response
		})
	} catch (error) {
		return res.status(500).send(error.message);
	}
})

route.delete('/:slug', authorization.required, async (req, res) => {
	const user = req.user;
	const slug = req.params.slug;
	try {
		const result = await ArticleController.deleteArticle(slug, user.id);
		if (result == 0) {
			return res.status();
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
	return res.status(200).json({
		message: 'Successfully Deleted'
	});
})

route.post('/:slug/favorite', authorization.required, async (req, res) => {
	const user = req.user;
	const slug = req.params.user;
	try {
		const article = await ArticleController.findBySlug(slug);
		if (article == null) {
			return res.status(404).json({
				message: 'Article Not Found'
			});
		}
		await article.addLike(user);
		const response = await processArticle(article, user);
		return res.status(200).json({
			article: response
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}

});

route.delete('/:slug/favorite', authorization.required, async (req, res) => {
	const user = req.user;
	const slug = req.params.user;
	try {
		const article = await ArticleController.findBySlug(slug);
		if (article == null) {
			return res.status(404).json({
				message: 'Article Not Found'
			});
		}
		await article.removeLike(user);
		const response = await processArticle(article, user);
		return res.status(200).json({
			article: response
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
});

module.exports = route