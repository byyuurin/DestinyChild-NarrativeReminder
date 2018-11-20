# Destiny Child - NarrativeReminder

> a reminder for Narrative Event of Destiny Child.

- [前往往頁](https://byyuurin.github.io/DestinyChild-NarrativeReminder/)

## 關於這個作品

這是一個針對手遊 [Destiny Child](http://www.destiny-child.jp/) 收集品活動所製作的輔助頁面，主要用途是方便確認活動收集品的達標狀況。

### 頁面提供了幾個功能

1. 透過下拉選單查詢 boost 倍率的期望值
2. 依據目標值列出每日應達標的數量
3. 若位於活動期間，當日的列數會被特別標示出來

### 其他機制

- 預設顯示最後一個活動資料
- 可回顧過去活動資訊
- 已結束的資料圖片灰階顯示
- 每個 setting 可簡易設定頁面的配色風格
- RWD 版面

### 活動設定範本

```json
{
  "eventStart": "",
  "eventEnd": "",
  "title": "",
  "banner": "",
  "link": "",
  "freeReset": 2,
  "maxFreeBox": 3,
  "rewardTarget": [150000, 190000, 250000, 320000],
  "boost": [100, 120, 150, 170, 200, 220],
  "reward": [25, 32, 50, 82, 133, 223, 339, 573],
  "boxReward": {
    "normal": [107, 205, 302, 1020],
    "boss": [107, 205, 302, 1020]
  },
  "boxRewardOdds": {
    "normal": [0.24, 0.18, 0.12, 0.06],
    "boss": [0.34, 0.18, 0.12, 0.06]
  },
  "theme": {
    "linearDark": "transparent",
    "linearLight": "transparent",
    "colorDark": "#000000",
    "colorLight": "#ffffff"
  }
}
```

### 使用技術

- JavaScript
- VueJS
- CSS
- SCSS
- Bootstrap
