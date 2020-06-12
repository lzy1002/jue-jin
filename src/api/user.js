import {request} from "../assets/js/request.js";

export function getUserInfo(userId) {
  const params = {
    ids: userId,
    uid: "",
    token: "",
    cols: "viewedEntriesCount|role|totalCollectionsCount|allowNotification|subscribedTagsCount|appliedEditorAt|email|followersCount|postedEntriesCount|latestCollectionUserNotification|commentedEntriesCount|weeklyEmail|collectedEntriesCount|postedPostsCount|username|latestLoginedInAt|totalHotIndex|blogAddress|selfDescription|latestCheckedNotificationAt|emailVerified|totalCommentsCount|installation|blacklist|weiboId|mobilePhoneNumber|apply|followeesCount|deviceType|editorType|jobTitle|company|latestVoteLikeUserNotification|authData|avatarLarge|mobilePhoneVerified|objectId|createdAt|updatedAt",
    device_id: 9685,
    client_id: 9685,
    src: "android",
  };

  return request({
    url: "/user/info",
    params
  })
}

export function getUserPins(userId) {
  const params = {
    device_id: 9685,
    client_id: 9685,
    src: "android",
    uid: userId,
    token: "",
    currentUid: "",
    limit: 20
  };

  return request({
    url: "/user/pins",
    params
  })
}

export function getUserActive(userId) {
  const data = {
    extensions: {
      query: {
        id: "97625453207145724a2023a871be76d6"
      }
    },
    variables: {
      ownerId: userId,
      after: ""
    }
  };

  return request({
    method: "post",
    url: "https://android-api.juejin.im/graphql",
    data
  })

}

export function getUserPosts(userId) {
  const params = {
    targetUid: userId,
    type: "post",
    before: "",
    order: "createdAt",
    uid: "",
    token: "",
    limit: 20,
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/user/posts",
    params
  })
}

export function getUserShare(userId) {
  const params = {
    targetUid: userId,
    type: "article",
    before: "",
    order: "createdAt",
    uid: "",
    token: "",
    limit: 20,
    device_id: 9685,
    client_id: 9685,
    src: "android"
  };

  return request({
    url: "/user/share",
    params
  })

}

export function getUserLike(userId) {
  const params = {
    page: 0,
    pageSize: 20
  };

  return request({
    url: `/user/like/v1/user/${userId}/like/entry`,
    params
  })
}
