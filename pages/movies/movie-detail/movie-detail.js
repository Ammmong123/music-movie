// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var commonF = require('../common/common.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var movieId = options.movieid;
        var url = app.globalData.g_doubanApi + "/v2/movie/subject/" + movieId;
        commonF.getMovieData(url, this.cuttingMovieData);

    },

    cuttingMovieData: function(data) {
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large;
            }
            director.name = data.directors[0].name;
            if (data.directors[0].id != null) {
                director.id = data.directors[0].id;
            }
        }
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: commonF.starF(data.rating.average),
            score: data.rating.average,
            director: director,
            casts: commonF.convertToCastString(data.casts),
            castsInfo: commonF.convertToCastInfos(data.casts),
            summary: data.summary
        };
        this.setData({
            movie: movie
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})