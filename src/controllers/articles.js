const {
    Article,
    User
} = require('../db');
const Slug = require('slug');
const randomString = require('randomstring');

async function findBySlug(slug) {
    const article = await Article.findOne({
        where: {
            slug: slug,
        },
        include: [{
            model: User,
            as: 'author'
        }]
    });
    return article;
}

async function findBySlugAndAuthor(slug, authorId) {
    const article = await Article.findOne({
        where: {
            slug: slug,
            authorId: authorId
        }
    });

    return article;
}

async function createArticle(title, description, body, authorId) {
    const slugVal = `${Slug(title.toLowerCase())}-${randomString.generate(7)}`;
    const newArticle = await Article.create({
        title: title,
        description: description,
        body: body,
        slug: slugVal,
        authorId: authorId
    });

    return newArticle;
}

async function updateArticle(slug, fields, authorId) {
    const article = await findBySlugAndAuthor(slug,authorId);
    if(article == null){
        return article;
    }
    if (fields.title) {
        article.title = fields.title;
        const newSlug = `${Slug(fields.title.toLowerCase())}-${randomString.generate(7)}`
        article.slug = newSlug;
    }
    if (fields.description) {
        article.description = fields.description;
    }
    if (fields.body) {
        article.body = fields.body;
    }
    const result = await article.save();
    return result;
}

async function deleteArticle(slug, authorId) {
    const result = await Article.destroy({
        where: {
            slug: slug,
            authorId: authorId
        }
    });
    return result;
}

module.exports = {
    findBySlug,
    findBySlugAndAuthor,
    createArticle,
    updateArticle,
    deleteArticle
}