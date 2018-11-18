const {
	Router
} = require('express')
const authorization = require('../../../middlewares/extractToken');
const ArticleController = require('../../../controllers/articles');
const processArticle = require('../../../util/processArticle').processArticle;
const CommentController = require('../../../controllers/comments');
const ProfileFactory = require('../../../dto/profileDTO');
const processComment = require('../../../util/processComment').processComment;
const CommentFactory = require('../../../dto/commentDTO');

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
	const slug = req.params.slug;
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
	const slug = req.params.slug;
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

route.get('/:slug/comments', authorization.optional, async (req, res) => {
	const user = req.user;
	const slug = req.params.slug;
	try {
		const comments = await CommentController.getComments(slug);
		const response = []
		for (let comment of comments) {
			const commentformat = await processComment(comment, user);
			response.push(commentformat);
		}
		return res.status(200).json({
			comments: response
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
});

route.post('/:slug/comments', authorization.required, async (req, res) => {
	const user = req.user;
	const slug = req.params.slug;
	const comment = req.body.comment;
	try {
		const article = await ArticleController.findBySlug(slug);
		if (article == null) {
			return res.status(404).json({
				error: {
					message: 'article not found'
				}
			});
		}
		const newComment = await CommentController.create(comment.body, user.id, article.id);
		const author = ProfileFactory.create(user);
		const response = CommentFactory.create(newComment, author);
		return res.status(200).json({
			comment: response
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
})

route.delete('/:slug/comments/:id', authorization.required, async (req, res) => {
	const user = req.user;
	const slug = req.params.slug;
	const id = req.params.id;
	try {
		const article = await ArticleController.findBySlug(slug);
		if (article == null) {
			return res.status(404).json({
				error: {
					message: 'article not found'
				}
			});
		}

		const result = await CommentController.deleteComment(id, user.id, article.id);
		if (result == 0) {
			return res.status(400).json({
				message: 'Comment: Deletion Unsuccessful'
			})
		} else {
			return res.status(200).json({
				message: 'Comment: Deletion Successful'
			})
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
});

module.exports = route