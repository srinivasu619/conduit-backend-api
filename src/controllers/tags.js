const {
    Tag
} = require('../db');

async function create(tagName) {
    const tag = await Tag.findOrCreate({
        where:{
            name: tagName
        }
    });

    return tag;
}

module.exports = {
    create
}