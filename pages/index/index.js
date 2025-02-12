// pages/index/index.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region:[''],
    now:"",
    id:''
  },
  //改变地区
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
    this.getWeather();
  },
  //获得当地经纬度
  getLocation:function(){
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success:function(res) {
        //console.log(res)
        var longitude = res.longitude
        var latitude = res.latitude
        that.LoadCity(longitude, latitude)
      }
     })
  },
  //当地天气查询
  LoadCity:function(longitude, latitude){
    var that=this;
    wx.request({
      url: 'https://api.jisuapi.com/weather/query?location=' + latitude + ',' + longitude + '&appkey=2891eede00cf1ae8',
      success:function(res){
        //console.log(res.data)
        var app = getApp()
        app.globalData.weather = res.data.result.weather
        app.globalData.weathernumber = res.data.result.img
        that.setData({
          region:res.data.result.city
        })
        db.collection("weather").add({
          data:{
            city:res.data.result.city,
            weather:res.data.result.weather,
            date:res.data.result.date,
            pngnum:res.data.result.img,
            temp:res.data.result.temp,
            temphigh:res.data.result.temphigh,
            templow:res.data.result.templow,
            humidity:res.data.result.humidity,
            aqi:res.data.result.aqi.aqi,
            color:res.data.result.aqi.aqiinfo.color,
            quality:res.data.result.aqi.quality,
          }
        }).then(res=>{
          //console.log(res)
          that.setData({
            id:res._id
          })
          db.collection('weather').where({
            _id:that.data.id
          })
          .get({
            success:res=>{
              //console.log(res)
              that.setData({
              now:res.data
              })
              //console.log(that.data.now)
            }
          })
        })
      }
    })
  },
  //获取天气
  getWeather:function(){
    var that=this;
    wx.request({
      url: 'https://api.jisuapi.com/weather/query?&appkey=2891eede00cf1ae8',
      data:{
        city:that.data.region[2],
      },
      success:function(res){
        db.collection("weather").add({
          data:{
            city:res.data.result.city,
            weather:res.data.result.weather,
            date:res.data.result.date,
            pngnum:res.data.result.img,
            temp:res.data.result.temp,
            temphigh:res.data.result.temphigh,
            templow:res.data.result.templow,
            humidity:res.data.result.humidity,
            aqi:res.data.result.aqi.aqi,
            color:res.data.result.aqi.aqiinfo.color,
            quality:res.data.result.aqi.quality,
          }
        }).then(res=>{
          //console.log(res)
          that.setData({
            id:res._id
          })
          db.collection('weather').where({
            _id:that.data.id
          })
          .get({
            success:res=>{
              //console.log(res)
              that.setData({
              now:res.data
              })
              //console.log(that.data.now)
            }
          })
        })
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