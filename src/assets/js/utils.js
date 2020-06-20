export const publishDate = (createdAt) => {
  const createDate = new Date(createdAt).getTime();
  const nowDate = new Date().getTime();
  const publishDate = nowDate - createDate;
  const second = publishDate / 1000;
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if(minute < 1) {
    return "刚刚";
  }else if(minute >= 1 && hour < 1) {
    return `${minute}分钟前`;
  }else if(hour >= 1 && day < 1) {
    return `${hour}小时前`;
  }else if(day >= 1 && month < 1) {
    return `${day}天前`;
  }else if(month >= 1 && year < 1) {
    return `${month}月前`;
  }else if(year >= 1) {
    return `${year}年前`;
  }
};

export const levelIcon = (level) => {
  switch (level) {
    case 1: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-1.636691c.svg";
    case 2: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-2.f597b88.svg";
    case 3: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-3.e108c68.svg";
    case 4: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-4.2c3fafd.svg";
    case 5: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-5.f8d5198.svg";
    case 6: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-6.74bd93a.svg";
  }
};

export const defaultAvatar = (avatarUrl) => {
  return avatarUrl || "https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg";
};
