const {
	Router
} = require('express')

const TagController = require('../../controllers/tags');
const route = Router()

route.get('/', async (req, res) => {
	const tags = await TagController.getPopularTags();
	return res.status(200).json({
		tags: tags
	});
})
module.exports = route