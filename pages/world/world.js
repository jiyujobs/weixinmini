// pages/world/world.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel:'头条',
    news:''
  },
  getNews:function(){
    var that=this;
    wx.request({
      url: 'https://api.jisuapi.com/news/get?appkey=87db7ff44bc87000',
      data:{
        channel:that.data.channel
      },
      success:function(res){
        console.log(res.data)
        that.setData({news:res.data.result})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews();
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