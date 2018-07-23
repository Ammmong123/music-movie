// pages/musics/music-detail/music-detail.js
var musicData = require('../../../data/music-data.js');
// 获取全局变量
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlaying: false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var musicId = options.id;
        // 在wxml中传递过来的系统改成小写
        this.setData({
            musicDetail: musicData.musicList[musicId],
            currentMusicId: musicId
        });

        var musicCollectionArray = wx.getStorageSync('musicCollection');
        if (musicCollectionArray) {
            var musicCollection = musicCollectionArray[musicId];
            if (musicCollection) {
                this.setData({
                    collection: musicCollection
                })
            }
        } else {
            var musicCollectionArray = {};
            musicCollectionArray[musicId] = false;
            wx.setStorageSync('musicCollection', musicCollectionArray);
        }

        // 音乐暂停播放监听，保证全局播发器和页面按钮一致
        var self = this;
        wx.onBackgroundAudioPlay(function () {
            app.globalData.g_isPlaying = true;
            app.globalData.g_PlayingId = self.data.currentMusicId;
            self.setData({
                isPlaying: true
            })
        });
        wx.onBackgroundAudioPause(function () {
            app.globalData.g_isPlaying = false;
            app.globalData.g_PlayingId = null;
            self.setData({
                isPlaying: false
            })
        });
        
        if (app.globalData.g_isPlaying && app.globalData.g_PlayingId == self.data.currentMusicId){
            self.setData({
                isPlaying: true
            })
        }
    },

    onCollection: function(event) {
        var musicCollectArray = wx.getStorageSync('musicCollection');
        // 从data里取得当前点击文件下标
        var musicCollect = musicCollectArray[this.data.currentMusicId];
        musicCollect = !musicCollect;
        musicCollectArray[this.data.currentMusicId] = musicCollect;
        this.showToast(musicCollect, musicCollectArray);
    },

    showToast: function(musicCollect, musicCollectArray) {
        wx.setStorageSync('musicCollection', musicCollectArray);
        // 更新数据绑定
        this.setData({
            collection: musicCollect
        })
        wx.showToast({
            title: musicCollect ? '收藏成功' : '取消成功',
            icon: 'success',
            duration: 1000
        })
    },

    onShare: function(event) {
        var list = ['分享到朋友圈', '分享到微博', '分享给好友'];
        wx.showActionSheet({
            itemList: list,
            itemColor: '#666'
        })
    },

    onMusic: function(event) {
        var isPlaying = this.data.isPlaying;
        var musicId = this.data.currentMusicId;
        var musicDataUrl = musicData.musicList[musicId];
        if (isPlaying) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlaying: false
            });
        } else {
            wx.playBackgroundAudio({
                dataUrl: musicDataUrl.music.url,
                title: musicDataUrl.music.title,
                coverImgUrl: musicDataUrl.music.corverImg
            });

            this.setData({
                isPlaying: true
            });
        }
    },

})