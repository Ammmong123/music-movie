// pages/movies/more-movies/moreMovies.js
var commonF = require('../common/common.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: [],
        loadCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var movietype = options.movietype;
        // console.log(movietype==="正在热映");
        var doubanApiBase = app.globalData.g_doubanApi;
        var inTheaters = doubanApiBase + "/v2/movie/in_theaters";
        var top250 = doubanApiBase + "/v2/movie/top250";
        var comingSoon = doubanApiBase + "/v2/movie/coming_soon";
        var dataUrl = '';
        switch (movietype) {
            case "正在热映":
                dataUrl = inTheaters;
                break;
            case "即将上映":
                dataUrl = comingSoon;
                break;
            case "top250":
                dataUrl = top250;
                break;
        }
        // console.log(options);
        this.setData({
            movieType: options.movietype,
            dataUrl: dataUrl
        });
        commonF.getMovieData(dataUrl, this.cuttingMovieData);
    },
    cuttingMovieData: function(movie) {
        var movieData = [];
        for (var idx in movie.subjects) {
            var sub = movie.subjects[idx];
            var title = sub.title;
            if (title.length >= 6) {
                title = title.slice(0, 6) + '...';
            }
            var temp = {
                star: commonF.starF(sub.rating.average),
                title: title,
                average: sub.rating.average,
                coverageUrl: sub.images.large,
                movieId: sub.id
            }
            movieData.push(temp);
            var totalMovies = []
            totalMovies = this.data.movie.concat(movieData);
        }

        this.data.loadCount += 20;
        this.setData({
            movie: totalMovies,
        });
        wx.hideNavigationBarLoading()
    },

    onMovieDetail: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '/pages/movies/movie-detail/movie-detail?movieid=' + movieId
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function(event) {
        //   改变跳转电影类型头标题
        wx.setNavigationBarTitle({
            title: this.data.movieType
        })
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
        wx.showNavigationBarLoading();
        var refreshUrl = this.data.dataUrl;
        this.setData({
            movie: [],
            loadCount: 0
        });
        commonF.getMovieData(refreshUrl, this.cuttingMovieData);


    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        wx.showNavigationBarLoading();
        var loadUrl = this.data.dataUrl + '?start=' + this.data.loadCount + '&count=20';
        commonF.getMovieData(loadUrl, this.cuttingMovieData);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})