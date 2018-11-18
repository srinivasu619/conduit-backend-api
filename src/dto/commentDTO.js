class CommentDTO {
    constructor(comment, author) {
        this.id = comment.id;
        this.body = comment.body;
        this.createdAt = comment.createdAt;
        this.updatedAt = comment.updatedAt;
        this.author = author;
    }
}

const CommentFactory = {
    create: (comment, author) => {
        return new CommentDTO(comment, author);
    }
}

module.exports = CommentFactory;