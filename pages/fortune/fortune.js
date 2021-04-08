// pages/fortune/fortune.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'2021-04-08',
    now:''
  },
  changeDate:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  getFortune:function(){
    var that=this;
    wx.request({
      url: 'https://way.jd.com/jisuapi/date?',
      date:{
        year:that.data.substring(0,4),
        month:that.data.substring(5,7),
        day:that.data.substring(8,10),
        appkey:'1dd72e8e3b7c43e7c8554f066538335d'
      },
      success:function(res){
        console.log(res.data)
        that.setData({now:res.data.now})
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFortune();
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