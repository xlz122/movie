/**
 * @description 16进制颜色值转换为rgba
 */
export const colorToRgba = function (color: string, alpha: number): string {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  // 颜色值转为小写
  color = color.toLowerCase();

  if (reg.test(color)) {
    // 处理三位的颜色值(#fff => #ffffff)
    if (color.length === 4) {
      let newColor = '#';
      for (let i = 1; i < 4; i += 1) {
        newColor += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }

      color = newColor;
    }

    // 处理六位的颜色值
    const colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2), 16));
    }

    return `rgba(${colorChange.join(',')},${alpha})`;
  }

  return color;
};

/**
 * @description 日期字符串格式化
 * @param { string } dateStr - 日期字符串
 * @return { string } 刚刚/分钟前/小时前/周前/月前/年前
 */
export function formatDistance(dateStr: string): string {
  const diff = new Date().getTime() - new Date(dateStr).getTime();

  if (diff < 1000 * 60) {
    return '刚刚';
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}分钟前`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))}小时前`;
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}天前`;
  } else if (diff < 1000 * 60 * 60 * 24 * 7 * 4) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 7))}周前`;
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}天前`;
  } else if (diff < 1000 * 60 * 60 * 24 * 30 * 12) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))}月前`;
  } else {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 365))}年前`;
  }
}

/**
 * @description 时间戳转视频时长
 * @param { number } timestamp - 时间戳
 * @return { string } 02:27/01:02:27
 */
export function timeStampToDuration(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  if (date.getUTCHours() === 0) {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}
