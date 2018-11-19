function validateArticle(req, res, next) {
    const article = req.body.article;

    if (!article) {
        return res.status(422).json({
            "status": "422",
            "error": {
                title: ['cannot be empty'],
                description: ['cannot be empty'],
                body: ['cannot be empty'],
            }
        });
    }
    const title = article.title
    const description = article.description
    const body = article.body
    const error = {};
    if (!title || title == null || title.length == 0) {
        error['title'] = ['cannot be empty']
    }
    if (!description || description == null || description.length == 0) {
        error['description'] = ['cannot be empty']
    }
    if (!body || body == null || body.length == 0) {
        error['body'] = ['cannot be empty']
    }

    if (error !== {}) {
        return res.status(422).json({
            error: error
        })
    }
    next();
}

module.exports = {
    validateArticle
}