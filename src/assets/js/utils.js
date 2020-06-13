export const publishDate = (createdAt) => {
  const createDate = new Date(createdAt).getTime();
  const nowDate = new Date().getTime();
  const publishDate = nowDate - createDate;
  const hour = publishDate / 1000 / 60 / 60;

  if(hour < 1) {
    return Math.floor(publishDate / 1000 / 60) + "分钟前";
  }else if(hour >= 24) {
    return Math.floor(hour / 24) + "天前";
  }

  return Math.floor(hour) + "小时前";
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
