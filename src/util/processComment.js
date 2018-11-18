const ProfileFactory = require('../dto/profileDTO');
const CommenFactory = require('../dto/commentDTO');
async function processComment(comment, user) {
    let author = comment.user;
    let following = false
    if(user){
        following = await author.hasFollower(user);
    }
    author = ProfileFactory.create(author,following);
    return CommenFactory.create(comment,author);
}

module.exports.processComment = processComment;