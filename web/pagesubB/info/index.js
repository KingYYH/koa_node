import {
  ArticleModel
} from '../../models/article'

const articleModel = new ArticleModel()

Page({
  data: {
    type: '',
    inputVal: ''
  },
  onLoad: function () {
  },
  chooseType(e) {
    this.setData({
      type: e.target.dataset.type
    })
  },
  bindVal(e) {
    this.setData({  
      inputVal: e.detail.value  
    },()=>{
      console.log(this.data.inputVal)
    })
  },
  sendListen() {
    let data = {
      listenval: this.data.inputVal,
      listentype: this.data.type
    }
    articleModel.sendListen(data).then(res=>{
      if (res.code == 200) {
        wx.showToast({
          title: '操作成功',
          icon: 'success'
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/index/index'
          })
        }, 500)
      }
      console.log(res.data)
    })
  },
  onPullDownRefresh() {
    console.log('refresh')
  }
})
