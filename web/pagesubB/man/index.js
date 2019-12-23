
const { LoverModel } = require('../../models/lover')

const loverModel = new LoverModel()
Page({
  data: {
    secObj: {
      name: '二闺女',
      hobby: '吃吃喝喝',
      constellation: '双鱼座',
      motto: '做最懒，最傻的自己',
      age: 25,
      intro: '介绍什么东西，我都懒得介绍自己'
    }
  },
  getData() {
    loverModel.list(1).then(res=>{
      if (res.code == 200) {
        res.data.hobbies = res.data.hobbies.split(',')
        this.setData({
          secObj: res.data
        })
      }
    })
  },
  onLoad: function () {
    this.getData()
  },
  onPullDownRefresh() {
  }
})
