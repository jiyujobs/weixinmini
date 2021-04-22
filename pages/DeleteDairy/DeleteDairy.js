// pages/DeleteDairy/DeleteDairy.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:''
  },
  //得到日记
  getDairy:function(e){
    console.log(e)
    db.collection('dairy').where({
      _id:e
    })
    .get().then(res=>{
      console.log(res)
      this.setData({
        obj:res.data
      })
    }).catch(err=>{
      console.log(err)
    })
  },

  //删除日记
  delete:function(e){
    console.log(e)
    db.collection('dairy').where({
      _id:e.currentTarget.dataset.num
    })
    .remove({
      success: function(res) {
        console.log(res.data)
      }
    })
    this.goback()
  },
  //返回
  goback:function(){
    wx.switchTab({
      url: '../mood/mood',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.getDairy(options.id)
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