// pages/constellationFortune/constellationFortune.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    obj:''
  },

  getFortune:function(e){
    var that = this
    wx.request({
      url: 'https://api.jisuapi.com/astro/fortune?appkey=87db7ff44bc87000',
      data:{
        astroid:e
      },
      success:function(res){
        console.log(res.data)
        db.collection("astro").add({
          data:{
            astroname:res.data.result.astroname,
            color:res.data.result.today.color,
            number:res.data.result.today.number,
            star:res.data.result.today.star
          }
        }).then(res=>{
          that.setData({
            id:res._id
          })
          db.collection("astro").where({
            _id:that.data.id
          })
          .get({
            success:res=>{
              that.setData({
                obj:res.data
              })
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
    this.getFortune(options.id)
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