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
