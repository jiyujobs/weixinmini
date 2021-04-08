// pages/fortune/fortune.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'2021-04-08',
    now:'',
    now1:''
  },
  changeDate:function(e){
    this.setData({
      date:e.detail.value
    })
    this.getFortune();
  },
  getFortune:function(){
    var that=this;
    var myDate = new Date(that.date);
    wx.request({
      url: 'https://api.jisuapi.com/huangli/date?appkey=87db7ff44bc87000',
      data:{
        year:myDate.getFullYear,
        month:myDate.getMonth,
        day:myDate.getDate
      },
      success:function(res){
        console.log(res.data)
        that.setData({now:res.data.result})
      }
    }),
    wx.request({
      url: 'https://api.jisuapi.com/astro/fortune?astroid=1&appkey=87db7ff44bc87000',
      data:{
        date:that.data.date
      },
      success:function(res){
        console.log(res.data)
        that.setData({now1:res.data.result.today})
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