class ProfileDTO {
    constructor(user, following) {
        this.username = user.username;
        this.bio = user.bio || null;
        this.image = user.image;
        this.following = following;
    }
}

const ProfileFactory = {
    create: (user,following = false) => {
        return new ProfileDTO(user, following);
    }
}

module.exports = ProfileFactory;