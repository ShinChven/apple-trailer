const http = require('superagent');

const quality = require('./quality');

function getPage(url, cb) {
    var dataUrl = url + "/data/page.json";
    http.get(dataUrl, function (err, resp) {
        if (err) {
            cb(new Error('request data failed'));
            return;
        }
        var page = resp.body;
        cb(null, page);
    });
}

function getAllVideoUrls(page, q) {
    var allVideoUrls = [];
    var clips = page.clips;
    clips.forEach(function (clip) {
        try {
            var clipUrl=clip.versions.enus.sizes[q].src;
            switch (q){
                case quality.sd:
                    clipUrl=clipUrl.replace('480p.mov',quality.h480p_mov);
                    break;
                case quality.hd720:
                    clipUrl=clipUrl.replace('720p.mov',quality.h720p_mov);
                    break;
                case quality.hd1080:
                    clipUrl=clipUrl.replace('1080p.mov',quality.h1080p_mov);
                    break;
            }
            allVideoUrls.push(clipUrl);
        } catch (e) {
            console.error(e);
        }
    });
    return allVideoUrls;
}

module.exports={
    getPage:getPage,
    getAllVideoUrls:getAllVideoUrls,
};





