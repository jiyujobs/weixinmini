// pages/mood/mood.js
const app = getApp()
Page({
  data: {
    avatarUrl: 'http://m.qpic.cn/psc?/V11Il2YV1ZFeFu/ruAMsa53pVQWN7FLK88i5sduo5dOhfNrw0UFrEelCNlIrDEO7DBnfGprG113pQzNN9m1svIpoKCPVd8z0Gu2Y5bUpXMJ3gxoLPAY13CDTxk!/mnull&bo=gACAAIAAgAADCSw!&rf=photolist&t=5',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
  },
  //登录
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },
  //获取用户信息
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        this.onGetOpenid()
        //console.log(res) 
      }
    })
  },
  
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      }) 
      this.onGetOpenid()
    }
  },
  //获取openid
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        var app = getApp()
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  //跳转到写日记界面
  toNewDairy: function(){
    wx.navigateTo({
      url: '../NewDairy/NewDairy',
    })
  },

  //跳转到我的日记界面
  toMyDairy: function(){
    wx.navigateTo({
      url: '../MyDairy/MyDairy',
    })
  },
  
})