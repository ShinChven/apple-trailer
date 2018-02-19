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
        return http
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
                return http.get(dataURL).then(readJSON);
            })
    } else { // resolve data from http url.
        // make up json url from http page url.
        let dataURL = url + '/data/page.json';
        return http
            .get(dataURL)
            .then(readJSON)
            .catch(function (err) {
                return new Promise(function (resolve, reject) {
                    reject(err);
                })
            });
    }
};

/**
 * Return a promise to provide data retrieved from Apple Trailer feeds.
 * @param resp Apple Trailer feeds response, must be a json response.
 * @returns {Promise<any>} Return a promise to provide data retrieved from Apple Trailer feeds.
 */
function readJSON(resp) {
    return new Promise(function (resolve, reject) {
        let data = resp.body;
        if (data) {
            resolve(data);
        } else {
            reject(new Error('no data'))
        }
    })
}

/**
 * getMostPop feeds
 * @returns {Request|PromiseLike<T>|Promise<T>}
 */
function getMostPop() {
    return http.get('https://trailers.apple.com/trailers/home/feeds/popular/most_pop.json')
        .then(readJSON);
}

/**
 * getOpening feeds
 * @returns {Request|PromiseLike<T>|Promise<T>}
 */
function getOpening() {
    return http.get('https://trailers.apple.com/trailers/home/feeds/opening.json').then(readJSON);
}

/**
 * getJustAdded feeds
 * @returns {Request|PromiseLike<T>|Promise<T>}
 */
function getJustAdded() {
    return http.get('https://trailers.apple.com/trailers/home/feeds/just_added.json').then(readJSON);
}

/**
 * Video qualities
 * @type {{sd: string, hd720: string, hd1080: string}}
 */
const quality = {
    sd: 'sd',
    hd720: 'hd720',
    hd1080: 'hd1080'
};

/**
 * Quality file name.
 * @type {{h1080p_mov: string, h720p_mov: string, h480p_mov: string}}
 */
const qualityName = {
    h1080p_mov: 'h1080p.mov',
    h720p_mov: 'h720p.mov',
    h480p_mov: 'h480p.mov'
};

/**
 * Video urls in Apple Trailer's json data can not be downloaded directly, this method serves to convert them to
 * downloadable ones.
 * url.
 * @param clipUrl data url.
 * @param q the quality you wish to convert.
 * @returns {*} real video url.
 */
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

/**
 * Get all video urls in a trailer page.
 * @param page trailer page json data.
 * @param q video quality, if undefined, video all qualities will be returned.
 * @returns {Array} downloadable video urls.
 */
function getVideoUrl(page, q) {
    let allVideoUrls = [];
    let clips = page.clips;
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
    getMostPop: getMostPop,
    getOpening: getOpening,
    getJustAdded: getJustAdded,
    getVideoUrl: getVideoUrl,
    getRealVideoURL: getRealVideoURL,
    quality: quality
};