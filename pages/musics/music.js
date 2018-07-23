var musicData = require('../../data/music-data.js')

// pages/music/music.js
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
        this.setData({
            musicKey: musicData.musicList
        });

    },
    musicTap: function(event) {
        var musicId = event.currentTarget.dataset.musicid;
        wx.navigateTo({
            url: 'music-detail/music-detail?id=' + musicId,
        })
    },

   
})