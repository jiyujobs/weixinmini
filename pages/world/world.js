import WxParse from '../../pages/wxParse/wxParse.js';

var app = getApp();
var news = app.globalData.news;

// pages/world/world.js

Page({
  
  /**
   * 图片数组swiperImg
   */
  data: {
    
    // swiperImg:[ //幻灯片图片数组
    //   {src:""},
    //   {src:""},
    //   {src:""}
    // ],
    imageWidth: app.globalData.imageWidth, //图片宽度自适应,令幻灯片图片宽度=屏幕宽度
    news:'',   // 接受API返回值的中间变量news
    channel:'财经',
    newslist:'' // 整理后的新闻列表数组
  },


  getNews:function(){
    var that=this;
    wx.request({
      url: 'https://api.jisuapi.com/news/get?appkey=2891eede00cf1ae8',
      data:{
        channel:that.data.channel
      },
      success:function(res){
        that.setData({news:res.data.result});   //worldnews页面中的news中间变量
        //console.log(that.data.news);
        app.globalData.news = that.data.news;   //通过worldnews页面中的news中间变量修改全局变量news的值
        console.log(app.globalData.news);

        // var article = app.globalData.news.list[2].content;
        // WxParse.wxParse('article','html',article,that,5);

        console.log(app.globalData.news.num);
        
        let list =[];
        for (var index = 0; index < app.globalData.news.num; index++) { //整理API返回的新闻,添加ID
          let obj = {};
          obj.id = index;
          obj.time = app.globalData.news.list[index].time;
          //console.log(app.globalData.news.list[index].time);
          //console.log(obj.time);
          obj.pic =  app.globalData.news.list[index].pic;
          //obj.content = news.list[index].content;
          obj.title =  app.globalData.news.list[index].title;
          obj.src =  app.globalData.news.list[index].src;
          list.push(obj);
          console.log(list[index].time);
       }
        that.setData({newslist:list}); //将整理好的新闻装载到新闻列表数组
      
    
      }

    })
    
  },


  goToNews:function(e){
    let id = e.currentTarget.dataset.id;
    var that=this;
    wx.navigateTo({
      url: '../world/newspage?id=' + id,
    })

  },

  changeChannel:function(e){
    //console.log(e)
    let targetChannel = e.currentTarget.dataset.id;
    console.log(targetChannel);
    this.setData({channel:targetChannel});
    console.log(this.data.channel);
    this.getNews();
  },

  onLoad: function (options) { 
    this.getNews();
    console.log(options.id);
    
    //this.loadNews(app.globalData.news);
  },
  /**
   * 生命周期函数--监听页面加载
   */
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