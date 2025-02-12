// pages/MyDairy/MyDairy.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    obj:""
  },
  //查询我的日记
  getMyDairy:function(){
    var app = getApp()
    db.collection('dairy').where({
      _openid:app.globalData.openid
    })
    .get({
      success:res=>{
        console.log(res)
        this.setData({
          obj:res.data
        })
      }
    })

  },
  //查看具体日记
  clicktap:function(e){
    var id
    console.log(e)
    id = e.currentTarget.dataset.num
    console.log(id)
    wx.navigateTo({
      url: '../DeleteDairy/DeleteDairy?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyDairy()
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