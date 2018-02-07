const fs = require('fs');
const quality = require('../src/quality');
const appleTrailerApi=require('../src/index');

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getOutputFileName(url) {
    return '../temp/' + url.replaceAll('/', '_').replaceAll(':', '_') + 'data_page.json';
}

function outputJsonFile(url, dataJSONString) {
    fs.writeFile(getOutputFileName(url), dataJSONString, function (err) {
        if (err) {
            console.log('write file failed');
            return;
        }
        console.log('write file success');
    })
}

/**
 * command line usage:
 * node test/test-get-all-video.js http://trailers.apple.com/trailers/magnolia/please-stand-by/
 */
function main() {
    let url = process.argv[2];
    console.log('home: ' + url);
    console.log('');
    appleTrailerApi.getPage(url, function (err, page) {
        if (err) {
            console.error(err);
            return;
        }

        // // output JSON data for inspection.
        // var dataJSONString = JSON.stringify(page, null, 2);
        // outputJsonFile(url,dataJSONString);
        // console.log(page);

        console.log(page.page.movie_title);

        try {
            console.log('hero: ' + page.heros['1'].imageurl);
        } catch (e) {
            console.error(e);
            console.log('hero: ' + page.heros['0'].imageurl);
        }
        console.log('');
        let allVideoUrls = appleTrailerApi.getAllVideoUrls(page, quality.hd1080);
        console.log('clips:');
        allVideoUrls.forEach(function (clipUrl) {
            console.log(clipUrl);
        })



    })
}

main();