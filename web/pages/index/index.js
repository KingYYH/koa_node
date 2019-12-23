//index.js
//获取应用实例
const app = getApp()
import {
  LikeModel
} from '../../models/favor.js'

import {
  ArticleModel
} from '../../models/article'

const likeModel = new LikeModel()
const articleModel = new ArticleModel()
Page({
  data: {
    page_no: 1,
    articleList: [],
    carouselList: [
      {
        img_url: '../../static/swiper/swiper1.jpg'
      },
      {
        img_url: '../../static/swiper/swiper2.jpg'
      },
      {
        img_url: '../../static/swiper/swiper3.jpg'
      }
    ]
  },
  createCircle() {
    wx.navigateTo({
      url: '/pagesubB/info/index'
    })
  },
  swiperClick() {
    console.log('点击')
  },
  getList() {
    articleModel.article(this.data.page_no).then(res => {
      let arr = []
      if (res.code == 200) {
        if (res.data.data.length) {
          this.setData({
            articleList: arr.concat(res.data.data)
          })
        }
      }
    })
  },
  collect(e) {
    likeModel.collect(e.target.dataset.id).then(res => {
      this.setData({
        page_no: 1
      },()=>{
        this.getList()
      })
    })
  },
  cancelZan(e) {
    likeModel.dislike(e.target.dataset.id).then(res => {
      this.setData({
        page_no: 1
      },()=>{
        this.getList()
      })
    })
  },
  addZan(e) {
    likeModel.like(e.target.dataset.id).then(res => {
      this.setData({
        page_no: 1
      },()=>{
        this.getList()
      })
    })
  },
  onReachBottom() {
    this.setData({
      page_no: this.data.page_no + 1
    },()=>{
      this.getList()
    })
  },
  onShow(options) {
    this.getList()
  },
  onLoad: function () {
  }
})
