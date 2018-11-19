const {
    Router
} = require('express')
const route = Router()

const authoriztion = require('../../../middlewares/extractToken');
const FeedController = require('../../../controllers/feed');
const processArticle = require('../../../util/processArticle').processArticle;

route.get('/', authoriztion.required, async (req, res) => {
    const user = req.user;
    const offset = req.query.offset;
    const limit = req.query.limit;
    const articleResult = await FeedController.getPersonalFeed(user.id, offset, limit);
    const articles = [];
    for(let article of articleResult.rows){
        const result = await processArticle(article,user);
        articles.push(result);
    }
    res.status(200).send({
        articlesCount: articleResult.count,
        articles: articles
    })
})
module.exports = route