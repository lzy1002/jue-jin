export class ArticleCls {
  constructor(originArticle) {
    this.title = originArticle.article_info.title;
    this.diggCount = originArticle.article_info.digg_count;
    this.user = originArticle.author_user_info;
    this.createdAt = originArticle.article_info.ctime;
    this.screenshot = originArticle.article_info.cover_image;
    this.articleId = originArticle.article_id;
  }
}

export class UserCls {
  constructor(originUser) {
    this.user_id = originUser.user_id;
    this.avatar_large = originUser.avatar_large;
    this.user_name = originUser.user_name;
    this.level = originUser.level;
    this.job_title = originUser.job_title;
    this.company = originUser.company;
  }
}

export class TopicCls {
  constructor(originTopic) {
    this.title = originTopic.topic.title;
    this.topicId = originTopic.topic_id;
    this.msgsCount = originTopic.topic.msg_count;
    this.followersCount = originTopic.topic.follower_count;
    this.icon = originTopic.topic.icon;
  }
}
