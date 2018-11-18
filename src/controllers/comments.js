const {
    Comment,
    User,
    Article
} = require('../db/index');

async function create(body, userId, articleId) {
    const comment = await Comment.create({
        body: body,
        userId: userId,
        articleId: articleId
    });

    return comment;
}

async function deleteComment(id, userId, articleId) {
    const result = await Comment.destroy({
        where: {
            id: id,
            userId: userId,
            articleId: articleId
        }
    });

    return result;
}

async function getComments(slug) {
    const comments = await Comment.findAll({
        include: [{
                model: Article,
                where: {
                    slug: slug
                },
                attributes: ['id']

            },
            {
                model: User,
            }
        ]
    });

    return comments;
}

module.exports = {
    create,
    deleteComment,
    getComments
}