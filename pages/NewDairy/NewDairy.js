// pages/NewDairy/NewDairy.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  //提交到数据库
  commit(res){
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth()+1
    var day = now.getDate()
    var date = now.getTime()
    var app = getApp()
    console.log(res)
    var content = res.detail.value.content
    var mood = res.detail.value.mood
    console.log(content)
    console.log(mood)
    if (content == '' || mood == '') {
      wx.showToast({
        title: '请填写心情和日记内容',
        icon: 'none',
        duration: 1500
      })
      return false
    }else {
      wx.showModal({
        title: '提交成功!',
        showCancel: false ,//去掉取消按钮
        confirmText: '确定',
        cancelText: '取消',
        confirmColor: '#36D5DD'
      })
    }
    db.collection("dairy").add({
      data:{
        mood:mood,
        content:content,
        weather:app.globalData.weather,
        year:year,
        month:month,
        day:day,
        did:date.toString()
      }
    }).then(res=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})