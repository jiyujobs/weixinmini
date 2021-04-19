// pages/fortune/fortune.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    id:'',
    now:'',
    now1:'',
    png:'',
    png1:''
  },
  changeDate:function(e){
    this.setData({
      date:e.detail.value
    })
    this.getFortune();
  },
  getFortune:function(){
    var that=this;
    var nowtime = new Date();
    var year = nowtime.getFullYear()
    var month = nowtime.getMonth()+1
    var day = nowtime.getDate()
    that.setData({
      date:year-month-day
    })
    wx.request({
      url: 'https://api.jisuapi.com/huangli/date?appkey=87db7ff44bc87000',
      success:function(res){
        console.log(res.data.result)
        db.collection("huangli").add({
          data:{
            nongli:res.data.result.nongli,
            yi:res.data.result.yi,
            ji:res.data.result.ji
          }
        }).then(res=>{
          that.setData({
            id:res._id
          })
          db.collection("huangli").where({
            _id:that.data.id
          })
          .get({
            success:res=>{
              that.setData({
                now:res.data
              })
            }
          })
        })
      }
    }),
    wx.request({
      url: 'https://api.jisuapi.com/astro/fortune?astroid=1&appkey=87db7ff44bc87000',
      data:{
        date:that.data.date
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
                now1:res.data
              })
            }
          })
        })
      }
    })
  },

  //跳转宜忌页面
  gotoYJ:function(e){
    var id
    id = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../YiJi/YiJi?id='+id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFortune()
    this.setDate()
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

  },
  setDate(){
    var date = new Date()
    this.setData({
      date: date.getFullYear()+'-'+(date.getMonth() + 1) + '-' +date.getDate()
    })
  }
})
