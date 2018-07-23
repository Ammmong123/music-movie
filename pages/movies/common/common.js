function lightStars(num) {
    var starNum = parseInt(num / 2) - 1;
    var starArray = [0, 0, 0, 0, 0];
    for (var i = 0; i < 5; i++) {
        if (i <= starNum) {
            starArray[i] = 1;
        }
    }
    return starArray;
};

function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
};

function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
};

function getMovieData(url, callback, headTitle, dataKey) {
    wx.request({
        url: url,
        header: {
            'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
            callback(res.data, headTitle, dataKey);
        },
        fail: function(error) {
            console.log('fali');
        }
    })
};


module.exports = {
    starF: lightStars,
    getMovieData: getMovieData,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}