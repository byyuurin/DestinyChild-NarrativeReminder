;(function() {
  if (/index\.html/.test(location.href)) {
    return location.replace(location.href.replace('/index.html', '/'))
  }

  new Vue({
    el: '#app',
    data: {
      showIndex: 0,
      boost: 100,
      settings: []
    },
    computed: {
      setting() {
        return this.settings[this.showIndex] || {}
      },
      days() {
        let list = []
        let startDay = new Date(this.setting.eventStart)

        for (let i = 0; i < this.eventDays; i++) {
          let day = new Date(startDay * 1 + i * 1000 * 60 * 60 * 24)
          list.push(day.toLocaleDateString())
        }
        return list
      },
      eventDays() {
        let start = new Date(this.setting.eventStart),
          end = new Date(this.setting.eventEnd)
        return (end - start) / 1000 / 60 / 60 / 24
      },
      dayLeft() {
        let endDay = new Date(this.setting.eventEnd)
        let today = new Date()
        return Math.round((endDay - today) / 1000 / 60 / 60 / 24)
      }
    },
    methods: {
      numberWithComma(n) {
        let regex = /(-?\d+)(\d{3})/,
          s = n.toString()
        while (regex.test(s)) {
          s = s.replace(regex, '$1,$2')
        }
        return s
      },
      expectedReward(x = 1) {
        let battleCounts = this.setting.reward.length
        let totalReward = 0

        for (let i = 0; i < battleCounts; i++) {
          let battleRound = i + 1,
            battleReward = this.setting.reward[i],
            boxCount = this.setting.maxFreeBox

          if (battleRound === battleCounts) {
            let boxReward = { normal: 0, boss: 0 },
              rewardCount = this.setting.boxReward.normal.length,
              sumBoxReward = 0

            for (let bx = 0; bx < rewardCount; bx++) {
              let reward, rewardOdds

              // Normal Round reward
              reward = this.setting.boxReward.normal[bx]
              rewardOdds = this.setting.boxRewardOdds.normal[bx]
              boxReward.normal += reward * rewardOdds * boxCount

              // Boss Round reward
              reward = this.setting.boxReward.boss[bx]
              rewardOdds = this.setting.boxRewardOdds.boss[bx]
              boxReward.boss += reward * rewardOdds * boxCount
            }

            sumBoxReward += boxReward.normal * (battleCounts - 1)
            sumBoxReward += boxReward.boss
            totalReward += battleReward + sumBoxReward
          } else {
            // Normal Round
            totalReward += battleReward
          }
        }

        return Math.floor(totalReward * x * this.boost) / 100
      },
      minReward(day, target) {
        let avgReward = target / this.eventDays
        return this.numberWithComma(Math.round(avgReward * day))
      },
      isToday(d) {
        let today = new Date()
        let day = new Date(d)
        today.setHours(0)
        today.setMinutes(0)
        today.setSeconds(0)
        today.setMilliseconds(0)
        return day - today === 0
      },
      changeShowIndex(offset) {
        let afterIndex = this.showIndex + offset
        let settingLength = this.settings.length

        if (afterIndex >= settingLength) {
          afterIndex = settingLength - 1
        }

        if (afterIndex < 0) {
          afterIndex = 0
        }

        // 只有 showIndex 變動時才將 boost 重置回預設值
        if (this.showIndex !== afterIndex) {
          this.boost = 100
        }

        this.showIndex = afterIndex
      }
    },
    created() {
      fetch('api/data.json')
        .then(res => {
          return res.json()
        })
        .then(data => {
          this.settings = data
          this.showIndex = this.settings.length - 1
        })
    },
    watch: {
      setting() {
        let theme = this.setting.theme
        document.querySelector('body').style = `--linear-dark:${
          theme.linearDark
        }; --linear-light:${theme.linearLight}; --color-dark:${
          theme.colorDark
        }; --color-light:${theme.colorLight};`
      }
    }
  })
})()
