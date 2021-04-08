// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['本地','天气','状况'],
    now:''
  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
    this.getWeather();
  },
  getLocation:function(){
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success:function(res) {
        console.log(res)
        var longitude = res.longitude
        var latitude = res.latitude
        that.LoadCity(longitude, latitude)
      }
     })
  },
  LoadCity:function(longitude, latitude){
    var that=this;
    wx.request({
      url: 'https://api.jisuapi.com/weather/query?location=' + latitude + ',' + longitude + '&appkey=87db7ff44bc87000',
      success:function(res){
        console.log(res.data)
        that.setData({now:res.data.result})
      }
    })
  },
  getWeather:function(){
    var that=this;
    wx.request({
      url: 'https://api.jisuapi.com/weather/query?&appkey=87db7ff44bc87000',
      data:{
        city:that.data.region[2],
      },
      success:function(res){
        that.setData({now:res.data.result})
        console.log(res.data) 
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
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