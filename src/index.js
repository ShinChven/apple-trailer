const http = require('superagent');
const cheerio = require('cheerio');
/**
 * resolve Apple Trailer page data.
 * @param url apple trailer page url, http and https are both supported.
 * @returns {Promise<any>} a promise to return data.
 */
function getPageData(url) {
    // check if there is a url
    if (!url) {
        return new Promise(function (resolve, reject) {
            reject(new Error('url is undefined'));
        })
    }
    if (url.indexOf('https://') === 0) { // resolve data from https url.
        // load https page html.
        let dataRequest = http
            .get(url)
            .then(function (resp) {
                // find movie id from html tag.
                let text = resp.text;
                let $ = cheerio.load(text);
                let appleItunesAppInfo = $('meta[name=apple-itunes-app]').attr('content');
                let split = appleItunesAppInfo.split('/');
                let id = split[split.length - 1];
                // make up json url with movie id.
                let dataURL = 'https://trailers.apple.com/trailers/feeds/data/' + id + '.json';
                // get json data.
                return http.get(dataURL);
            })
            .catch(function (err) {
                return new Promise(function (resolve, reject) {
                    reject(err);
                });
            });
        return dataRequest.then(function (resp) {
            let data = resp.body;
            return new Promise(function (resolve, reject) {
                resolve(data);
            });
        })
            .catch(function (err) {
                // console.error(err);
                return new Promise(function (resolve, reject) {
                    reject(err);
                });
            });
    } else { // resolve data from http url.
        // make up json url from http page url.
        let dataURL = url + '/data/page.json';
        return http
            .get(dataURL)
            .then(function (resp) {
                let data = resp.body;
                return new Promise(function (resolve) {
                    resolve(data);
                })
            })
            .catch(function (err) {
                return new Promise(function (resolve, reject) {
                    reject(err);
                })
            });
    }
};

const quality = {
    sd: 'sd',
    hd720: 'hd720',
    hd1080: 'hd1080'
};

const qualityName = {
    h1080p_mov: 'h1080p.mov',
    h720p_mov: 'h720p.mov',
    h480p_mov: 'h480p.mov'
};

function getRealVideoURL(clipUrl, q) {
    switch (q) {
        case quality.sd:
            clipUrl = clipUrl.replace('480p.mov', qualityName.h480p_mov);
            break;
        case quality.hd720:
            clipUrl = clipUrl.replace('720p.mov', qualityName.h720p_mov);
            break;
        case quality.hd1080:
            clipUrl = clipUrl.replace('1080p.mov', qualityName.h1080p_mov);
            break;
    }
    return clipUrl;
}

function getVideoUrl(page, q) {
    var allVideoUrls = [];
    var clips = page.clips;
    clips.forEach(function (clip) {
        if (q) {
            try {
                let clipUrl = clip.versions.enus.sizes[q].src;
                let realVideoURL = getRealVideoURL(clipUrl, q);
                allVideoUrls.push(realVideoURL);
            } catch (e) {
                console.error(e);
            }
        } else {
            Object.keys(quality).forEach(function (key) {
                try {
                    let clipUrl = clip.versions.enus.sizes[key].src;
                    let realVideoURL = getRealVideoURL(clipUrl, key);
                    allVideoUrls.push(realVideoURL);
                } catch (e) {
                    console.error(e);
                }
            });

        }

    });
    return allVideoUrls;
}

module.exports = {
    getPageData: getPageData,
    getVideoUrl: getVideoUrl,
    getRealVideoURL: getRealVideoURL,
    quality: quality
};