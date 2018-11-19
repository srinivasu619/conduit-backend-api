const {
    Tag,
    ArticleTag
} = require('../db');
const sequelize = require('sequelize');

async function create(tagName) {
    const tag = await Tag.findOrCreate({
        where: {
            name: tagName
        }
    });

    return tag;
}
/**
 * GET Top 10 Popular Tags.
 */
async function getPopularTags() {
    const tagsInfo = await ArticleTag.findAll({
        group: ['tagId'],
        attributes: ['tagId', [sequelize.fn('COUNT', 'tagId'), 'articleCount']],
        order: [
            [sequelize.literal('articleCount'), 'DESC']
        ],
        limit: 10,
    });

    const tagsId = tagsInfo.map(tag => tag.tagId);

    const tagsDetails = await Tag.findAll({
        where: {
            id: tagsId,
        },
        attributes: ['name']
    })

    const tags = tagsDetails.map(tag => tag.name);

    return tags;
}

module.exports = {
    create,
    getPopularTags
}