export class ArticleCls {
  constructor(originArticle) {
    this.title = originArticle.title;
    this.collectionCount = originArticle.collectionCount || originArticle.likeCount;
    this.user = originArticle.user;
    this.createdAt = originArticle.createdAt;
    this.screenshot = originArticle.screenshot;
    this.objectId = originArticle.objectId || originArticle.id;
  }
}

export class UserCls {
  constructor(originUser) {
    this.user = {};
    this.user.objectId = originUser.objectId || originUser.id;
    this.user.avatarLarge = originUser.avatarLarge;
    this.user.username = originUser.username;
    this.user.level = originUser.level;
    this.title = originUser.jobTitle;
  }
}
