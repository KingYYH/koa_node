//index.js
//获取应用实例
const app = getApp()
import {
  LikeModel
} from '../../models/favor'

const likeModel = new LikeModel()
Page({
  data: {
    flowList: [],
    page_no: 1
  },
  onLoad: function () {
  },
  getList() {
    likeModel.list(this.data.page_no).then(res => {
      let arr = []
      if (res.code == 200) {
        if (res.data.data.length) {
          this.setData({
            flowList: arr.concat(res.data.data)
          })
        }
      }
    })
  },
  onShow(options) {
    this.getList()
  },
  onPullDownRefresh() {
  }
})
