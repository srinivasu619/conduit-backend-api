const {
	Article,
	User,
	Tag
} = require('../db');

async function getFeed(authorName, tag, favoritedBy, offset = 0 , limit = 10) {
	let includeModels = [];
	if (authorName) {
		const authorModel = {
			model: User,
			as: 'author',
			where: {
				username: authorName
			},
			attributes: []
		}
		includeModels.push(authorModel);
	}
	if (tag) {
		const tagModel = {
			model: Tag,
			where: {
				name: tag
			},
			attributes: []
		}
		includeModels.push(tagModel);
	}
	if (favoritedBy) {
		const likeModel = {
			model: User,
			as: 'Likes',
			where: {
				username: favoritedBy
			},
			attributes: []
		}
		includeModels.push(likeModel);
	}
	const articles = await Article.findAndCountAll({
		include: includeModels,
		distinct: true,
		offset: offset,
		limit: limit,
		attributes: ['id', 'updatedAt'],
		order: [
			['updatedAt', 'DESC']
		]
	});
	const count = articles.count;
	const articlesId = articles.rows.map(item => item.id);
	const articleDetails = await Article.findAll({
		where: {
			id: articlesId
		},
		include: [{
			model: User,
			as: 'author'
		}, {
			model: Tag,
			through: {
				attributes: []
			},
			attributes: ['name']
		}],
		order: [
			['updatedAt', 'DESC']
		]
	});
	const response = {
		rows: articleDetails,
		count: count
	}
	return response;
}

async function getPersonalFeed(userId, offset = 0, limit = 10) {
	const followees = await User.findAll({
		include: [{
			model: User,
			as: 'followers',
			where: {
				id: userId
			},
			attributes: []
		}],
		attributes: ['id']
	});
	const authorsId = followees.map(item => item.id);
	const articleDetails = await Article.findAndCountAll({
		where: {
			authorId: authorsId
		},
		include: [{
			model: User,
			as: 'author'
		}, {
			model: Tag,
			through: {
				attributes: []
			},
			attributes: ['name']
		}],
		order: [
			['updatedAt', 'DESC']
		],
		distinct: true,
		offset: offset,
		limit: limit,
	});
	const response = {
		rows: articleDetails.rows,
		count: articleDetails.count
	}
	return response;
}

module.exports = {
	getFeed,
	getPersonalFeed
}