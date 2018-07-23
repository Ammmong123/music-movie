// pages/movies/movie.js
var commonF = require('common/common.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 为了防止因异步造成数据在取得之前绑定找不到
        inTheaters: {},
        comingSoon: {},
        top250: {},
        movieStatus: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var doubanApiBase = app.globalData.g_doubanApi;
        var DataNum = '?star=0&count=3';
        var inTheaters = doubanApiBase + "/v2/movie/in_theaters" + DataNum;
        var top250 = doubanApiBase + "/v2/movie/top250" + DataNum;
        var comingSoon = doubanApiBase + "/v2/movie/coming_soon" + DataNum;
        commonF.getMovieData(inTheaters, this.cuttingMovieData, '正在热映', 'inTheaters');
        commonF.getMovieData(top250, this.cuttingMovieData, 'top250', 'top250');
        commonF.getMovieData(comingSoon, this.cuttingMovieData, '即将上映', 'comingSoon');
    },
    cuttingMovieData: function(movie, headTitle, dataKey) {
        var movieData = [];
        // console.log(movie.subjects[2].title);
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
        }
        var curData = {};
        curData[dataKey] = {
            headTitle: headTitle,
            movie: movieData
        };
        this.setData(curData);
    },
    moreMovies: function(event) {
        var title = event.currentTarget.dataset.movietype;
        wx.navigateTo({
            url: 'more-movies/moreMovies?movietype=' + title
        })
    },

    onFocus: function() {
        this.setData({
            movieStatus: false
        });

    },
    onConfirm: function(event) {
        var text = event.detail.value;
        var searchUrl = app.globalData.g_doubanApi + "/v2/movie/search?q=" + text;
        commonF.getMovieData(searchUrl, this.cuttingMovieData, '搜索', 'searchResult');
    },

    onBlur: function(event) {
        this.setData({
            inputValue: event.detail.value
        });
    },

    onCancel: function() {
        this.setData({
            movieStatus: true,
            inputValue: ''
        });
    },

    onMovieDetail: function(event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '/pages/movies/movie-detail/movie-detail?movieid=' + movieId
        })
    },



    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

})