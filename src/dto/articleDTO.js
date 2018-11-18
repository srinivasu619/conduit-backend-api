class ArticleDTO {
    constructor(article, author, tagList, favoritesCount, favorited) {
        this.title = article.title;
        this.slug = article.slug;
        this.description = article.description;
        this.body = article.body;
        this.createdAt = article.createdAt;
        this.updatedAt = article.updatedAt;
        this.tagList = tagList;
        this.author = author;
        this.favorited = favorited;
        this.favoritesCount = favoritesCount;
    }
}

const ArticleFactory = {
    create: (article, author, tagList, likesCount, favorited) => {
        return new ArticleDTO(article, author, tagList, likesCount, favorited);
    }
}

module.exports = ArticleFactory;