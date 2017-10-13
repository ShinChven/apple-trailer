const fs = require('fs');
const quality = require('../src/quality');
const appleTrailerApi=require('../src/apple-trailer-api');

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

function main() {
    let url = "https://trailers.apple.com/trailers/lucasfilm/rogueoneastarwarsstory/";
    console.log('home: ' + url);
    console.log('');
    appleTrailerApi.getPage(url, function (err, page) {
        if (err) {
            console.error(err);
            return;
        }

        // // output JSON data for inspection.
        // var dataJSONString = JSON.stringify(data, null, 2);
        // outputJsonFile(url,dataJSONString);
        // console.log(data);

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